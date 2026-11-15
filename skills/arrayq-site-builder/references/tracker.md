# Visitor Tracker

Track page views, clicks and form submissions on your website with the ArrayQ tracker, on sites hosted by ArrayQ or anywhere else.

Source: [https://arrayq.com/docs/site-builder/tracker](https://arrayq.com/docs/site-builder/tracker), last updated 2026-10-20.

The tracker records what visitors do on your website so you can see which pages bring in work. It is a small script that loads in the background and does not slow your pages down.

## What it records

| Event | When it fires |
| --- | --- |
| `page_view` | A visitor opens a page |
| `click` | A visitor clicks a link or button |
| `form_submit` | A visitor submits a form |

Each event includes the page URL and the referrer. Visitors get an anonymous ID stored in their browser, and each visit gets a session ID, so repeat visits are grouped together.

## Turn it on

**Hosted on ArrayQ**

Open **Site Builder**, go to **Tracker** and switch on **Add Tracker to my hosted site**.

ArrayQ adds the script to every HTML page of your published site automatically. You do not need to change your files or publish again.

**Any other website**

Copy the snippet from the **Any other website** section of the **Tracker** tab and paste it before the closing `body` tag on every page.

```html
<script
  async
  src="https://api.getwecycle.com/tracker/tracker.js"
  data-site-key="YOUR_SITE_KEY"
></script>
```

> **Note**
>
> On a site hosted by ArrayQ there is no key to manage. On other websites, the snippet needs your [site key](connect-your-site.md#sites-hosted-elsewhere). The tracker only accepts your current key, so update the snippet after you regenerate it.

## Avoid double counting

If a page already contains the tracker script, ArrayQ does not add a second copy. You can safely keep the snippet in your files and leave automatic tracking switched on.
