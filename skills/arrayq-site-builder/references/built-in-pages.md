# Built-in Pages

Every site hosted on ArrayQ gets a ready-made checkout, sign in, registration and customer account with order tracking and live chat. Link to them from your pages instead of building your own.

Source: [https://arrayq.com/docs/site-builder/built-in-pages](https://arrayq.com/docs/site-builder/built-in-pages), last updated 2026-11-19.

Every site published on ArrayQ comes with a set of pages you do not have to build. They are served at fixed paths on your site's own domain, work on phones and desktops, and connect to your account automatically. Your website only needs marketing pages, such as a home page, a blog or location pages, plus links to these paths.

## The pages

| Path | What the customer sees |
| --- | --- |
| `/checkout/SERVICE_ID` | A checkout for one service: contact details, date and time of day, service address, the service's own questions and notes. No payment is taken. |
| `/login` | Sign in with a one-time code sent by email. No password. |
| `/register` | Create an account with name, email and phone, then confirm with an emailed code |
| `/app` | The customer's account: their orders with you, a status tracker for each one, invoices they can pay online and live chat with your team |
| `/app/orders/BOOKING_ID` | One order with its status, details and invoices |
| `/app/messages` | Live chat with your team, with typing and online status |

The pages show only your business name, which links back to your home page. They carry no ArrayQ branding and are not editable.

## How the customer flow works

1. **They pick a service on your site**

   Your service card links to `/checkout/SERVICE_ID`.

2. **They book**

   Checkout works without an account. A customer who is signed in skips the contact fields. Every booking lands in your dashboard as a new job.

3. **They sign in to track it**

   After booking, guests see a **Sign in to track this order** button. Signing in with the same email shows the order in `/app`.

4. **They follow along**

   The tracker moves from **Requested** to **Confirmed** to **Completed** as your team updates the job. Invoices you send appear on the order with a **Pay** button.

5. **They message you**

   Messages from `/app/messages` arrive in **Messages** in your dashboard, tagged **Website**. Replies show up for the customer in real time.

## Linking to the pages

Use paths that start with `/` for these pages. They live at the root of your domain, not inside your uploaded folder.

```html
<a href="/login">Sign in</a>
<a href="/register">Create an account</a>
<a href="/app">My orders</a>
```

There is no general checkout page: every checkout is for one service. Your **Book now** buttons should take visitors to your service list, for example `href="/#services"`, and each service links straight to its checkout with its `_id`. In a Liquid theme:

```liquid
{% for service in site.services %}
  <a href="/checkout/{{ service._id }}">Book {{ service.title }}</a>
{% endfor %}
```

On a service page, `templates/service.liquid`, use `/checkout/{{ service._id }}` directly. See [Theme data](theme-data.md).

### Query parameters

| Page | Parameter | Effect |
| --- | --- | --- |
| `/login`, `/register` | `next` | Where to go after signing in. Must start with `/`, for example `/app/messages`. |
| `/login`, `/register` | `email` | Fills in the email field |

## Reserved paths

The paths `/login`, `/register`, anything under `/checkout/` and anything under `/app/` always show the built-in pages, even if your theme has templates with those names. Files with an extension are not affected, so `/assets/app.js` still loads normally. Use other names for your own pages, for example `templates/contact.liquid` or `templates/locations/`.

> **Warning: Preview links**
>
> The built-in pages only exist on your published site: its ArrayQ link and your custom domain. Template previews in the dashboard do not serve them, so links to `/checkout/SERVICE_ID` or `/login` do nothing there. Opening `/checkout` without a service sends the visitor back to your home page.

## What you still control

- **Services:** each service's title, cover image, description and questions on its checkout come from **Services** in your dashboard. Only active services can be booked.
- **Booking status:** accept, complete or cancel the job in **Jobs** and the tracker updates for the customer.
- **Invoices:** invoices you create on the job appear in the customer's order. Customers pay online when Stripe is connected in **Payments**.
- **Chat:** answer from **Messages**. The customer sees you as **Online** while you have Messages open.

> **Tip**
>
> Building your own booking form is still possible with the [Services and booking API](services-and-booking.md), but most sites should link to the built-in checkout instead. See [Custom checkout page](custom-checkout-page.md).
