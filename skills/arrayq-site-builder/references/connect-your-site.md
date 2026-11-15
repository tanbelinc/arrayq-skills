# Connect Your Site

Sites hosted on ArrayQ need no API key. Load the config.js file ArrayQ serves with your site and your services, bookings, tracker and Orca chatbot connect automatically. Use the site key only for websites hosted elsewhere.

Source: [https://arrayq.com/docs/site-builder/api-key](https://arrayq.com/docs/site-builder/api-key), last updated 2026-10-20.

Your website needs two things to talk to ArrayQ: the API address and a site key that tells ArrayQ which business a request belongs to. When ArrayQ hosts your site, you do not copy or paste either of them. ArrayQ serves both in a `config.js` file next to your pages.

## Sites hosted on ArrayQ

1. **Load config.js first**

   Add `./config.js` to every page, before your own script. You do not upload this file, ArrayQ serves it at the root of your published site.

2. **Read the settings**

   Read `window.SITE_CONFIG` in your script and send `SITE_KEY` in the `x-provider-id` header.

3. **Publish**

   [Publish](publish.md) your folder. There is no key to set.

```html
<script defer src="./config.js"></script>
<script defer src="./app.js"></script>
```

On your published site, `config.js` looks like this:

```js
window.SITE_CONFIG = Object.freeze({
  API_BASE_URL: "https://api.getwecycle.com",
  SITE_KEY: "pk_...",
});
```

Use it in one `request` helper that every call goes through:

```js
const CONFIG = window.SITE_CONFIG;

if (!CONFIG || typeof CONFIG !== "object") {
  throw new Error("The site configuration is missing. Load config.js before app.js.");
}

async function request(path, options = {}) {
  const response = await fetch(`${CONFIG.API_BASE_URL}/api${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "x-provider-id": CONFIG.SITE_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}
```

> **Note**
>
> ArrayQ always serves its own `config.js`. If your folder contains a `config.js`, it is ignored on your published site, so you can keep a local copy for testing on your computer.

> **Tip**
>
> The site key is safe in the browser. It only identifies your business, it does not give anyone access to your dashboard.

## Sites hosted elsewhere

If your website runs on another host, ArrayQ cannot serve `config.js` for it, so you add the key yourself.

1. **Open Site Builder**

   Sign in to your dashboard and open **Site Builder** from the sidebar.

2. **Go to the API key tab**

   Click **API key**.

3. **Generate the key**

   Click **Generate key**, then use the copy button to copy it.

Create your own `config.js` with the same shape and load it before your script:

```js
window.SITE_CONFIG = Object.freeze({
  API_BASE_URL: "https://api.getwecycle.com",
  SITE_KEY: "YOUR_SITE_KEY",
});
```

The tracker and Orca scripts take the key in a `data-site-key` attribute:

```html
<script
  async
  src="https://api.getwecycle.com/tracker/tracker.js"
  data-site-key="YOUR_SITE_KEY"
></script>
```

## Regenerate the key

If a key leaks or you want a fresh one, click **Regenerate key** in the **API key** tab and confirm. The old key stops working.

- **Hosted on ArrayQ:** nothing to do. `config.js`, the tracker and Orca pick up the new key automatically.
- **Hosted elsewhere:** replace the key in your `config.js` and in every tracker or Orca snippet, then deploy your site again.
