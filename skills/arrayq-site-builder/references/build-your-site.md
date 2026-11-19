# Build Your Site

The folder structure, routing, layout, snippets and link rules for a Liquid theme on ArrayQ Site Builder. Pages are rendered on the server with your services, so they are fully indexable by search engines.

Source: [https://arrayq.com/docs/site-builder/build-your-site](https://arrayq.com/docs/site-builder/build-your-site), last updated 2026-11-19.

A Site Builder website is a **Liquid theme**: a folder of templates that ArrayQ renders on the server for every visit. Liquid is a simple template language. You write normal HTML and drop in tags such as `{{ service.title }}` or `{% for service in site.services %}`. ArrayQ fills them with your data before the page is sent, so visitors and search engines get finished HTML.

> **Tip: Let AI build it**
>
> The [Build with AI](build-with-ai.md) page has a single prompt with every rule on this page. Paste it into an AI tool to get a complete theme.

## Folder structure

| Folder | What goes in it | Served to visitors |
| --- | --- | --- |
| `layout/` | `theme.liquid`, the frame around every page | No, used while rendering |
| `templates/` | One `.liquid` file per page | Yes, as clean URLs without an extension |
| `snippets/` | Reusable pieces such as a header, footer or card | No, used while rendering |
| `assets/` | CSS, JavaScript, images, fonts and other files | Yes, as they are |

`.liquid` files are never served directly. A visitor who opens `/templates/index.liquid` gets your 404 page.

## Pages and URLs

Each file in `templates/` becomes a page. URLs have no `.html` or `.liquid` at the end.

| Template | URL |
| --- | --- |
| `templates/index.liquid` | `/` |
| `templates/about.liquid` | `/about` |
| `templates/locations/austin.liquid` | `/locations/austin` |
| `templates/service.liquid` | `/services/SERVICE_SLUG`, one page for every active service |
| `templates/404.liquid` | Any URL that does not match a page, sent with a 404 status |

- A trailing slash is fine: `/about/` shows the same page as `/about`.
- A URL that ends in `.html` redirects permanently to the same URL without it, so old links keep working and search engines index one address per page.
- `/services/SERVICE_SLUG` shows the 404 page when no active service has that slug.
- Without a `templates/404.liquid`, missing pages show a plain "Page not found" message.
- Without a `templates/index.liquid`, your home page shows the 404 page.

## The layout

`layout/theme.liquid` wraps every template. Put the parts that repeat on every page here: the `head`, header and footer. Output the page itself with `{{ content_for_layout }}`.

```liquid
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {% render 'seo' %}
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  {% render 'header' %}
  <main id="main">{{ content_for_layout }}</main>
  {% render 'footer' %}
</body>
</html>
```

Templates then contain only the content of the page:

```liquid
<h1>{{ site.provider.businessName }}</h1>
<div class="grid">
  {% for service in site.services %}
    {% render 'service-card', service: service %}
  {% endfor %}
</div>
```

Without a `layout/theme.liquid`, each template must be a full HTML document.

## Snippets

Put a reusable piece in `snippets/NAME.liquid` and add it to any template, the layout or another snippet with `{% render 'NAME' %}`. Pass values with `{% render 'service-card', service: service %}`.

`site`, `page` and `service` are available inside every snippet without passing them. Other variables, such as a loop variable, must be passed. See [Theme data](theme-data.md).

## Links

| Link to | Write it as |
| --- | --- |
| Your own pages | `/about`, `/locations/austin`, `/services/{{ service.slug }}` |
| Your assets | `/assets/styles.css`, `/assets/logo.svg` |
| Home | `/` |
| A service checkout | `/checkout/{{ service._id }}` |
| Sign in, account, chat | `/login`, `/register`, `/app`, `/app/messages` |

Always start links with `/`. Pages live at clean URLs such as `/services/junk-removal`, where a relative link like `./styles.css` would point inside `/services/`.

### Header and footer links

| Button | Link |
| --- | --- |
| Book now | Your service list, for example `/#services` |
| Book a specific service | `/checkout/{{ service._id }}` |
| Learn about a service | `/services/{{ service.slug }}` |
| Sign in | `/login` |
| Create account | `/register` |
| Track my order, My orders | `/app` |
| Message us | `/app/messages` |

## Site rules

- Do not create templates or folders named `login`, `register`, `checkout` or `app`. Those paths always show the [built-in pages](built-in-pages.md).
- Keep file and folder names simple: letters, numbers, dashes and dots. Avoid `..` and backslashes.
- Use only allowed file types. See [Publish your site](publish.md#limits).
- Everything in `assets/` is public. Never put secrets or keys in any file.

> **Warning: No server-side code**
>
> Liquid is the only thing that runs on the server. PHP, Node.js servers and `.env` files do not run on Site Builder.

## JavaScript is optional

Pages are complete without JavaScript. Add a script in `assets/` for things that happen in the browser, such as a mobile menu:

```liquid
<script defer src="/assets/app.js"></script>
```

If a script needs to call the ArrayQ API, for example a [custom checkout page](custom-checkout-page.md), load `/config.js` first. See [Connect your site](connect-your-site.md).

## Plain HTML sites

A site without any `templates/*.liquid` file is served as plain static files, without Liquid:

- `/about` serves `about.html`, then `about/index.html`.
- `/about.html` redirects to `/about`.
- A missing page shows your `404.html`, or a plain "Page not found" message.

Plain HTML sites load their services in the browser with the [Services API](services-and-booking.md). Moving to a Liquid theme puts that content in the HTML itself, which is better for search engines.

Next, see everything you can use in a template in [Theme data](theme-data.md).
