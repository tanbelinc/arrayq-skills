# Build Your Site

Rules and structure for a static marketing website that runs on ArrayQ Site Builder, including page layout, links to the built-in pages and relative links between your own files.

Source: [https://arrayq.com/docs/site-builder/build-your-site](https://arrayq.com/docs/site-builder/build-your-site), last updated 2026-11-14.

Site Builder hosts **static websites**: HTML, CSS, JavaScript, images and fonts. There is no server code. Your service list loads in the browser through the [Services API](services-and-booking.md), and booking, sign in and the customer account are handled by the [built-in pages](built-in-pages.md).

> **Tip: Let AI build it**
>
> The [Build with AI](build-with-ai.md) page has a single prompt with every rule on this page. Paste it into an AI tool to get a complete site.

## Site rules

- Put an `index.html` at the top of your folder. It is your home page and the upload fails without it.
- Use **relative links** between your own files, such as `./about.html` or `./styles.css`.
  Your published site sits at the root of its ArrayQ link and your custom domain, where links that start with `/` also work.
  Relative links keep working when you open the folder on your computer before you upload it, where links that start with `/` break.
- Link to the built-in pages with paths that start with `/`: `/checkout/SERVICE_ID`, `/login`, `/register` and `/app`. They only work on your published site, not in template previews.
- Do not create folders named `login`, `register`, `checkout` or `app`. Those paths always show the built-in pages. Files with an extension, such as `app.js`, are fine.
- Keep file and folder names simple: letters, numbers, dashes and dots. Avoid `..` and backslashes.
- A path that does not exist falls back to your root `index.html`.
- Only use allowed file types. See [Publish your site](publish.md#limits) for the full list.

> **Warning: No server-side code**
>
> PHP, Node.js servers and `.env` files do not run on Site Builder. Keep secrets out of your files, because everything you upload is public.

## Page structure

A booking site needs one page and one script. ArrayQ adds `config.js` and the checkout for you.

| File | Purpose |
| --- | --- |
| `index.html` | Your brand, a short pitch and a grid that lists your services |
| `app.js` | Loads services and renders cards that link to `/checkout/SERVICE_ID` |
| `styles.css` | Styling |
| `config.js` | Served by ArrayQ with your API address and site key. You do not upload it |

Add as many marketing pages as you like, such as an about page, location pages or a blog. Give each one the same header and footer.

### Header and footer links

| Button | Link |
| --- | --- |
| Book now | Your service list, for example `#services` or `/#services` from other pages |
| Book a specific service | `/checkout/SERVICE_ID` |
| Sign in | `/login` |
| Create account | `/register` |
| Track my order, My orders | `/app` |
| Message us | `/app/messages` |
| Home | `/` |

Give the service list fixed IDs so one script can find it on any page that has it:

```html
<body>
  <section id="services">
    <p id="service-status" role="status">Loading services...</p>
    <button id="service-retry" type="button" hidden>Try again</button>
    <div id="service-grid" hidden></div>
  </section>
  <script defer src="./config.js"></script>
  <script defer src="./app.js"></script>
</body>
```

```js
if (document.querySelector("#service-grid")) {
  initializeServiceCatalog();
}
```

## Saving the ZIP code

If you build a [custom checkout page](custom-checkout-page.md), a ZIP form on the home page makes it faster. Save the value in `localStorage` and fill it in on your checkout page:

```js
const STORAGE_KEY = "postalCode";

function storePostalCode(postalCode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, postalCode);
  } catch {
    return;
  }
}

function getStoredPostalCode() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}
```

Next, [connect your site](connect-your-site.md) to ArrayQ with `config.js`.
