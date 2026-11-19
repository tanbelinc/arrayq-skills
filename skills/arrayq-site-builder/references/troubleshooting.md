# Troubleshooting

Fix common ArrayQ Site Builder problems, from Liquid errors and missing services to upload failures, broken links and custom domain issues.

Source: [https://arrayq.com/docs/site-builder/troubleshooting](https://arrayq.com/docs/site-builder/troubleshooting), last updated 2026-11-19.

## "Could not load site"

A template failed to render.

- Check the spelling of every filter. A filter that does not exist stops the page, for example `{{ service.title | uppercase }}` instead of `| upcase`.
- Check that every `{% if %}`, `{% for %}` and `{% capture %}` has its matching `{% endif %}`, `{% endfor %}` or `{% endcapture %}`.
- Check that every `{% render 'NAME' %}` has a matching `snippets/NAME.liquid`.
- Avoid very large loops. A page must finish rendering within 2 seconds.

## Liquid tags show up as text on the page

- Liquid only runs in `.liquid` files inside `templates/`, `layout/` and `snippets/`. Rename `.html` pages to `.liquid` and move them into `templates/`.
- Template previews in the **Templates** tab show the raw files. Open your published site instead.

## A page shows the 404 page

- Check that the template exists: `/about` needs `templates/about.liquid`.
- Service pages need `templates/service.liquid`, and the service must be **Active** with that slug.
- A theme without `templates/index.liquid` shows the 404 page at `/`.

## My layout is missing

The layout must be at exactly `layout/theme.liquid` and output the page with `{{ content_for_layout }}`.

## A snippet shows nothing

Variables from the page, such as a `for` loop variable, are not visible inside a snippet. Pass them: `{% render 'service-card', service: service %}`. `site`, `page` and `service` are always available.

## A service change does not show

Rendered pages are cached for up to 1 minute. Reload after a minute. Only **Active** services are listed.

## "x-provider-id header is required"

A browser script called the API without a valid site key. Liquid themes do not need a key.

- Check that every request sends `window.SITE_CONFIG.SITE_KEY` in the `x-provider-id` header.
- On a site hosted by ArrayQ, check that each page loads `./config.js` before your own script, and that your script does not hard code an old key.
- On a site hosted elsewhere, copy the key again from the **API key** tab into your own `config.js`. A missing or extra character is the most common cause.

## No services show up

- Make sure your services are set to **Active** in the **Services** section of your dashboard.
- In a Liquid theme, check the loop reads `site.services`, for example `{% for service in site.services %}`.
- In a browser script, check the console for errors and make sure requests use `SITE_CONFIG.API_BASE_URL` and a path that starts with `/api/service`.

## Booking fails with a 400 error

A required field is missing or has the wrong format.

| Message | Fix |
| --- | --- |
| Date is required | Send `date` as a JSON string with a `date` value |
| Location is required | Send `location` as a JSON string |
| Timezone is required | Include `timezone` inside the `date` JSON |
| Invalid date format | Use `YYYY-MM-DD` for the date |

See the field list in [Services and booking](services-and-booking.md#book-a-service).

## Duplicate bookings

Send an `idempotencyKey` with every booking and reuse it when the customer retries. Clear it only after a successful response.

## Upload fails

- Remove files with extensions that are not on the [allowed list](publish.md#limits).
- Stay under 200 files, 15 MB per file and 50 MB in total. Compress large images and videos.

## Styles or links break after publishing

- Start every link with `/`, for example `/assets/styles.css` and `/about`. Relative links such as `./styles.css` break on pages like `/services/junk-removal`.
- Check that every file a page links to is in the folder you uploaded, with the same name and path. A missing file returns a 404.

## Built-in pages show the 404 page or do nothing

- Open the page on your published site, its ArrayQ link or your custom domain. Template previews in the dashboard do not serve `/checkout/SERVICE_ID`, `/login`, `/register` or `/app`.
- Check the link starts with `/`, for example `/checkout/{{ service._id }}`, not `./checkout.html`.
- Make sure the link ends with the service `_id`. `/checkout` on its own has no service, so it sends visitors back to your home page.

## Customers do not receive the sign in code

- Ask them to check spam and promotions folders. The code expires after 5 minutes, and **Resend code** sends a new one.
- Make sure they use the same email they booked with, so their orders show up after signing in.

## Messages from customers do not show up

Website chats appear in **Messages** in your dashboard, tagged **Website**. Your team needs the Messages permission to see them.

## "Site unavailable"

Your plan no longer includes Site Builder. Update your plan in **Settings** and the site comes back with the same files.

## Requests work locally but fail on another domain

The API accepts requests from every origin, so this is rarely a CORS problem. Check the browser console for the real error, usually a wrong key or a typo in the URL.

## Custom domain stays on "Waiting for DNS"

- Check the record type is `CNAME` and the name and target match the dashboard exactly.
- Remove any other `A` or `CNAME` record for the same name.
- Wait a little longer. Some DNS providers take a few hours to publish changes.

## Still stuck?

Email [support@arrayq.com](mailto:support@arrayq.com) with your site link and a screenshot of the error.
