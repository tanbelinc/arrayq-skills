# Services and Booking API

Load your ArrayQ services and create bookings from your website. Endpoints, headers, request fields and response shapes for the public booking API. Hosted sites read the key from config.js.

Source: [https://arrayq.com/docs/site-builder/services-and-booking](https://arrayq.com/docs/site-builder/services-and-booking), last updated 2026-11-07.

Your website uses three public endpoints: one to list services, one to load a single service and one to book it. On a site hosted by ArrayQ you usually only need the first one: list your services and link each card to the [built-in checkout](built-in-pages.md), which loads the service and creates the booking for you. Every request sends your site key in the `x-provider-id` header. On a site hosted by ArrayQ, read it from `window.SITE_CONFIG` in the `config.js` file ArrayQ serves. See [Connect your site](connect-your-site.md).

## Base URL and headers

| Setting | Value |
| --- | --- |
| Base URL | `SITE_CONFIG.API_BASE_URL` plus `/api` (`https://api.getwecycle.com/api`) |
| Key header | `x-provider-id: SITE_CONFIG.SITE_KEY` |
| Accept header | `application/json` |
| CORS | Open to every origin, so you can call it from any website |

> **Note**
>
> The service list only returns services that belong to the business behind the key and are set to **Active**.

## List services

`GET /api/service?limit=100`

| Query | Default | Description |
| --- | --- | --- |
| `limit` | `10` | How many services to return |
| `skip` | `0` | How many services to skip, for paging |

The response is an array of services:

```json
[
  {
    "_id": "665f1c2e9b1d4a0012ab34cd",
    "title": "Garage Door Repair",
    "slug": "garage-door-repair",
    "description": "Broken springs, cables and openers fixed fast.",
    "cover": "https://res.cloudinary.com/.../cover.jpg",
    "priceInputs": [],
    "discount": null,
    "isSpecificItemSupported": false
  }
]
```

```js
async function initializeServiceCatalog() {
  const grid = document.querySelector("#service-grid");
  const services = await request("/service?limit=100");

  services.forEach((service) => {
    const link = document.createElement("a");
    link.href = `/checkout/${encodeURIComponent(service._id)}`;
    link.textContent = service.title;
    grid.append(link);
  });

  grid.hidden = false;
}
```

> **Tip**
>
> Build cards with `textContent` instead of `innerHTML`. Service text is typed by people, so this keeps any stray HTML from running on your page.

> **Note**
>
> The link above opens the built-in checkout. If you built a [custom checkout page](custom-checkout-page.md) instead, link to it with a relative path such as `./book.html?serviceId=...`.

## Get one service

`GET /api/service/:id?findby=id`

| Query | Values | Description |
| --- | --- | --- |
| `findby` | `id`, `slug`, `title` | How to read the `:id` part of the path |

On a [custom checkout page](custom-checkout-page.md), use `findby=slug` if you want clean links such as `checkout.html?service=garage-door-repair`. The built-in checkout always takes the service `_id`.

### Price inputs

A service can ask the customer extra questions that affect the price, like the number of doors. They come in `priceInputs`:

```json
{
  "name": "doors",
  "label": "Number of doors",
  "inputType": "number",
  "required": true,
  "options": []
}
```

| Field | Description |
| --- | --- |
| `name` | Send this back with the answer |
| `label` | Text to show next to the field |
| `inputType` | `number`, `text`, `select` or `radio` |
| `required` | Whether the customer must answer |
| `options` | For `select` and `radio`: a list of `label` and `value` pairs |

## Book a service

`POST /api/service/:id/book`

Send the booking as `multipart/form-data`. Build it with `FormData` and let the browser set the content type. Object fields are JSON strings.

| Field | Required | Content |
| --- | --- | --- |
| `date` | Yes | JSON: `date` (`YYYY-MM-DD`), `mode` (`ONE_TIME`), `timeslot`, `timezone` |
| `location` | Yes | JSON: `name`, `street`, `city`, `state`, `postalCode` |
| `guestUser` | Yes | JSON: `firstName`, `lastName`, `email`, `phone`, `textConsent` |
| `priceInputs` | No | JSON array of `name` and `value` pairs |
| `isSpecificItem` | No | `"false"` for a regular service booking |
| `specialNote` | No | Notes from the customer |
| `idempotencyKey` | Recommended | A unique ID per booking attempt, so a retry never creates a second job |
| `images` | No | One or more photo files |
| `attribution` | No | JSON with marketing data such as `utmSource`, `utmCampaign`, `gclid`, `referrer` and `landingPage` |

Timeslots are `ALL_DAY`, `MORNING`, `AFTERNOON` and `EVENING`. The timezone is the customer's IANA timezone, for example `America/New_York`.

```js
function buildBookingPayload(values, idempotencyKey) {
  const payload = new FormData();

  payload.append(
    "date",
    JSON.stringify({
      date: values.serviceDate,
      mode: "ONE_TIME",
      timeslot: values.timeslot,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  );
  payload.append(
    "location",
    JSON.stringify({
      name: `${values.street}, ${values.city}, ${values.state} ${values.postalCode}`,
      street: values.street,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
    })
  );
  payload.append(
    "guestUser",
    JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      textConsent: values.textConsent,
    })
  );
  payload.append("priceInputs", JSON.stringify(values.priceInputs));
  payload.append("isSpecificItem", "false");
  payload.append("specialNote", values.specialNote);
  payload.append("idempotencyKey", idempotencyKey);

  return payload;
}

function createBooking(serviceId, payload) {
  return request(`/service/${encodeURIComponent(serviceId)}/book`, {
    method: "POST",
    body: payload,
  });
}
```

A successful booking returns the booking reference:

```json
{ "bookingId": "66a0c7f19b1d4a0012ab9f31" }
```

The booking appears in your dashboard as a new job. No payment is taken at this step, so your team can review the job and confirm the visit with the customer.

> **Warning: Retries**
>
> Create the `idempotencyKey` once with `crypto.randomUUID()` and reuse it if the customer clicks the button again after an error. Clear it only after a successful booking.

## Errors

Failed requests return a status code and a `message`. The message is usually a string, but validation errors can return an object with one message per field:

```json
{ "message": "x-provider-id header is required" }
```

```js
function formatApiError(payload, status) {
  if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message;
  }
  if (payload?.message && typeof payload.message === "object") {
    return Object.values(payload.message).filter(Boolean).join(" ");
  }
  return `The request could not be completed (${status}).`;
}
```

| Status | Meaning |
| --- | --- |
| `400` | Missing or invalid site key, or a required booking field is missing |
| `404` | No service with that ID, slug or title belongs to your business |
| `500` | Something went wrong on our side. Try again in a moment |

See [Troubleshooting](troubleshooting.md) for common fixes.
