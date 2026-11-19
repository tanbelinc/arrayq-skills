# Build a Custom Checkout Page

An optional, fully custom booking checkout page for ArrayQ Site Builder. Most sites should link to the built-in checkout instead. Use this when you need your own booking form or host your site elsewhere.

Source: [https://arrayq.com/docs/site-builder/checkout-page](https://arrayq.com/docs/site-builder/checkout-page), last updated 2026-11-19.

> **Tip: You probably do not need this page**
>
> Every site hosted on ArrayQ already has a checkout at `/checkout/SERVICE_ID`, plus sign in, order tracking and chat. Link your service cards there instead. See [Built-in pages](built-in-pages.md). Build a custom checkout only if you need your own form, or your site is hosted outside ArrayQ. Do not name your page `checkout`: `/checkout` always opens the built-in checkout, and `checkout.html` redirects there.

This page puts the pieces together into a working booking flow. The home page lists your services, each card links to `/book?serviceId=...` and the checkout page books the chosen service.

Save the page as `book.html` and the script as `app.js`, then publish. On ArrayQ hosting there is no key to set, the page reads it from the `config.js` file ArrayQ serves.

> **Note: In a Liquid theme**
>
> Save the page as `templates/book.liquid` so it opens at `/book`, and the script as `assets/checkout.js`. Change the script tags to `/config.js` and `/assets/checkout.js`, and the stylesheet to `/assets/styles.css`. If you use `layout/theme.liquid`, keep only the contents of `body` in the template and load the two scripts from the layout. Link your service cards to `/book?serviceId={{ service._id }}`.

## The checkout HTML

The form uses fixed field names that the script reads. The `#custom-price-inputs` container is filled with the service's [price inputs](services-and-booking.md#price-inputs).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Book a Service</title>
    <link rel="stylesheet" href="./styles.css" />
    <script defer src="./config.js"></script>
    <script defer src="./app.js"></script>
  </head>
  <body data-page="checkout">
    <main>
      <p id="checkout-loading" role="status">Loading service details...</p>

      <div id="checkout-error" role="alert" hidden>
        <h1 id="checkout-error-message"></h1>
        <a href="/#services">Return to services</a>
      </div>

      <div id="checkout-content" hidden>
        <h1 id="checkout-service-title"></h1>
        <p id="checkout-service-description"></p>

        <form id="checkout-form">
          <input name="firstName" autocomplete="given-name" required />
          <input name="lastName" autocomplete="family-name" required />
          <input name="email" type="email" autocomplete="email" required />
          <input name="phone" type="tel" autocomplete="tel" required />
          <input name="street" autocomplete="street-address" required />
          <input name="city" autocomplete="address-level2" required />
          <input name="state" autocomplete="address-level1" required />
          <input
            id="postalCode"
            name="postalCode"
            inputmode="numeric"
            pattern="[0-9]{5}"
            maxlength="5"
            required
          />
          <input id="serviceDate" name="serviceDate" type="date" required />
          <select name="timeslot">
            <option value="ALL_DAY">Any time</option>
            <option value="MORNING">Morning</option>
            <option value="AFTERNOON">Afternoon</option>
            <option value="EVENING">Evening</option>
          </select>
          <div id="custom-price-inputs"></div>
          <textarea name="specialNote"></textarea>
          <label>
            <input name="textConsent" type="checkbox" checked />
            I agree to receive calls or text messages about this request.
          </label>
          <p id="form-message" hidden></p>
          <button id="submit-button" type="submit">Confirm service request</button>
        </form>
      </div>
    </main>
  </body>
</html>
```

> **Tip**
>
> Add a visible `label` for every field in your real page. The example leaves them out to stay short.

## The script

This is the full `app.js` for the checkout page. It reads its settings from `window.SITE_CONFIG`, as shown in [Connect your site](connect-your-site.md#sites-hosted-on-arrayq).

```js
const CONFIG = window.SITE_CONFIG;

if (!CONFIG || typeof CONFIG !== "object") {
  throw new Error("The site configuration is missing. Load config.js before app.js.");
}

let activeService = null;
let idempotencyKey = null;

async function request(path, options = {}) {
  const response = await fetch(`${CONFIG.API_BASE_URL}/api${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "x-provider-id": CONFIG.SITE_KEY,
      ...options.headers,
    },
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed (${response.status})`);
  }

  return payload;
}

function getService(serviceId) {
  return request(`/service/${encodeURIComponent(serviceId)}?findby=id`);
}

function createBooking(serviceId, payload) {
  return request(`/service/${encodeURIComponent(serviceId)}/book`, {
    method: "POST",
    body: payload,
  });
}

function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function createPriceInput(definition, index) {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  const fieldName = `priceInput-${index}`;
  const labelText = definition.label || definition.name;
  let field;

  label.htmlFor = fieldName;
  label.textContent = labelText;

  if (definition.inputType === "select" || definition.inputType === "radio") {
    field = document.createElement("select");
    (definition.options || []).forEach((option) => {
      const element = document.createElement("option");
      element.value = option.value;
      element.textContent = option.label;
      field.append(element);
    });
  } else {
    field = document.createElement("input");
    field.type = definition.inputType === "number" ? "number" : "text";
  }

  field.id = fieldName;
  field.name = fieldName;
  field.required = definition.required === true;
  wrapper.append(label, field);
  return wrapper;
}

function buildPayload(form, service) {
  const values = new FormData(form);
  const read = (name) => String(values.get(name) || "").trim();
  const payload = new FormData();

  payload.append(
    "date",
    JSON.stringify({
      date: read("serviceDate"),
      mode: "ONE_TIME",
      timeslot: read("timeslot"),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  );
  payload.append(
    "location",
    JSON.stringify({
      name: `${read("street")}, ${read("city")}, ${read("state")} ${read("postalCode")}`,
      street: read("street"),
      city: read("city"),
      state: read("state"),
      postalCode: read("postalCode"),
    })
  );
  payload.append(
    "priceInputs",
    JSON.stringify(
      (service.priceInputs || []).map((input, index) => ({
        name: input.name,
        value: read(`priceInput-${index}`),
      }))
    )
  );
  payload.append("isSpecificItem", "false");
  payload.append(
    "guestUser",
    JSON.stringify({
      firstName: read("firstName"),
      lastName: read("lastName"),
      email: read("email"),
      phone: read("phone"),
      textConsent: values.get("textConsent") === "on",
    })
  );
  payload.append("specialNote", read("specialNote"));
  payload.append("idempotencyKey", idempotencyKey);
  return payload;
}

function showMessage(text, type) {
  const element = document.querySelector("#form-message");
  element.textContent = text;
  element.className = type;
  element.hidden = false;
}

function showError(text) {
  document.querySelector("#checkout-loading").hidden = true;
  document.querySelector("#checkout-content").hidden = true;
  document.querySelector("#checkout-error-message").textContent = text;
  document.querySelector("#checkout-error").hidden = false;
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = document.querySelector("#submit-button");

  if (!activeService || !form.reportValidity()) {
    return;
  }

  button.disabled = true;

  try {
    if (!idempotencyKey) {
      idempotencyKey = crypto.randomUUID();
    }
    const result = await createBooking(
      activeService._id,
      buildPayload(form, activeService)
    );
    form.reset();
    idempotencyKey = null;
    showMessage(
      `Your request was received. Your reference is ${result.bookingId}.`,
      "success"
    );
  } catch (error) {
    showMessage(error.message, "error");
  } finally {
    button.disabled = false;
  }
}

async function initializeCheckout() {
  const serviceId = new URLSearchParams(location.search).get("serviceId");

  if (!serviceId) {
    showError("Select a service before opening checkout.");
    return;
  }

  try {
    const service = await getService(serviceId);
    activeService = service;
    document.title = `${service.title} | Book now`;
    document.querySelector("#checkout-service-title").textContent = service.title;
    document.querySelector("#checkout-service-description").textContent =
      service.description || "";
    document.querySelector("#serviceDate").min = todayString();
    document.querySelector("#postalCode").value =
      localStorage.getItem("postalCode") || "";

    const container = document.querySelector("#custom-price-inputs");
    (service.priceInputs || []).forEach((definition, index) => {
      container.append(createPriceInput(definition, index));
    });

    document
      .querySelector("#checkout-form")
      .addEventListener("submit", handleSubmit);
    document.querySelector("#checkout-loading").hidden = true;
    document.querySelector("#checkout-content").hidden = false;
  } catch (error) {
    showError(error.message);
  }
}

if (document.body.dataset.page === "checkout") {
  initializeCheckout();
}
```

## How it works

1. **Read the service ID**

   The script takes `serviceId` from the page URL. Without it, the page shows an error with a link back to your services.

2. **Load the service**

   It fetches the service, fills in the title and description, blocks past dates and adds a field for each price input.

3. **Submit the booking**

   On submit, it checks the form, builds the `FormData` payload and posts it with a single idempotency key.

4. **Confirm**

   On success, it clears the form, forgets the key and shows the booking reference. On failure, it keeps the key so a retry cannot create a duplicate job.

## Test it

1. Open your published site and click a service.
2. Fill in the form with your own details and submit.
3. Open **Jobs** in your dashboard. The booking is there with the details you entered.

> **Note**
>
> Use a test service or cancel the job afterwards so your team does not dispatch a crew to a test booking.
