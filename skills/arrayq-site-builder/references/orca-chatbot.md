# Orca Chatbot

Add the Orca AI chat assistant to your website so visitors can ask questions and book services any time, on ArrayQ hosted sites or elsewhere.

Source: [https://arrayq.com/docs/site-builder/orca-chatbot](https://arrayq.com/docs/site-builder/orca-chatbot), last updated 2026-10-20.

Orca is the ArrayQ AI assistant. On your website it answers visitor questions about your services and helps them book, even after hours.

## Before you start

- Your plan must include Orca.
- Orca must be set up and enabled in the **Orca** section of your dashboard.

## Add Orca to your site

**Hosted on ArrayQ**

Open **Site Builder**, go to **Orca chatbot** and switch on automatic install.

ArrayQ adds the chat widget to every HTML page of your published site. There is nothing to change in your files.

**Any other website**

Copy the install snippet from the **Orca chatbot** tab and paste it before the closing `body` tag on every page.

```html
<script
  async
  src="https://api.getwecycle.com/orca/orca.js"
  data-site-key="YOUR_SITE_KEY"
></script>
```

> **Tip**
>
> On other websites, Orca uses the same [site key](connect-your-site.md#sites-hosted-elsewhere) as your booking script and tracker. If a page already includes the Orca script, ArrayQ does not add it twice.

## If the widget does not show

1. Check that Orca is enabled in the **Orca** section of your dashboard.
2. Check that your plan includes Orca.
3. For sites hosted elsewhere, check that the `data-site-key` matches your current key.
