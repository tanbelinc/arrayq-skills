# Site Builder Overview

How ArrayQ Site Builder works. Build a Liquid theme, publish it on ArrayQ and get server-rendered pages filled with your services, plus a built-in checkout, sign in and customer account.

Source: [https://arrayq.com/docs/site-builder](https://arrayq.com/docs/site-builder), last updated 2026-11-19.

Site Builder hosts your website on ArrayQ and connects it to your account. You write your pages as a **Liquid theme**. ArrayQ fills them with your business details, services and items on the server, so every page reaches the visitor, and search engines, as complete HTML. No JavaScript is needed to show your services.

You bring the marketing pages: a home page, a page for each service, and an about page, location pages or a blog if you want them. ArrayQ hosts them and adds the rest: a checkout, customer sign in, and a customer account with order tracking, invoices and live chat. See [Built-in pages](built-in-pages.md).

## How it fits together

| Piece | What it does | Where you manage it |
| --- | --- | --- |
| Your theme | Liquid templates, a shared layout, snippets and assets | Your computer or code editor |
| Theme data | Your business, services, categories and items, ready to use in templates | **Services**, **Specific Items** and your business profile in the dashboard |
| Built-in pages | Checkout, sign in, registration and the customer account at `/checkout/SERVICE_ID`, `/login`, `/register` and `/app` | Included, nothing to build |
| Hosting | Renders and serves your pages on an ArrayQ link | Site Builder, **Builder** tab |
| Tracker | Records page views, clicks and form submissions | Site Builder, **Tracker** tab |
| Orca chatbot | Answers visitor questions on your site | Site Builder, **Orca chatbot** tab |
| Custom domain | Serves the site on your own domain | Site Builder, **Domain** tab |

## The end-to-end flow

1. **Build your theme**

   Create a folder with `layout/theme.liquid`, a `templates` folder and your assets, or let an AI tool build it with the [Build with AI](build-with-ai.md) prompt. See [Build your site](build-your-site.md).

2. **Show your services**

   Loop over `site.services` in a template and link each one to its page or checkout. See [Theme data](theme-data.md).

3. **Link to the built-in pages**

   Point your **Sign in** and **My orders** buttons to `/login` and `/app`, and each service to `/checkout/{{ service._id }}`. See [Built-in pages](built-in-pages.md).

4. **Publish**

   Upload the folder in the **Builder** tab and click **Publish site**. See [Publish your site](publish.md).

5. **Turn on the extras**

   Switch on the [Tracker](tracker.md) and the [Orca chatbot](orca-chatbot.md), then connect a [custom domain](custom-domain.md).

## Example theme

```text
my-site/
  layout/
    theme.liquid        Wraps every page: head, header, footer
  templates/
    index.liquid        /
    service.liquid      /services/SERVICE_SLUG
    about.liquid        /about
    404.liquid          Shown for any page that does not exist
  snippets/
    header.liquid       {% render 'header' %}
    footer.liquid
    service-card.liquid
  assets/
    styles.css          /assets/styles.css
    favicon.svg
```

Every service you add in the dashboard gets its own page at `/services/SERVICE_SLUG` from the one `service.liquid` template. There is no checkout or account page in the theme, because ArrayQ provides those.

> **Note**
>
> Sites made of plain `.html` files still publish and are served as they are, without Liquid. See [Plain HTML sites](build-your-site.md#plain-html-sites).

## Who can use Site Builder

Business owners and admins can open Site Builder. Crew members need the **Site builder** permission. Your plan must include Site Builder, or your published site shows a "Site unavailable" page.
