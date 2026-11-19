# Theme Data

Every object and field you can use in an ArrayQ Site Builder Liquid theme, including your business profile, services, categories and items, plus filters, escaping and caching.

Source: [https://arrayq.com/docs/site-builder/theme-data](https://arrayq.com/docs/site-builder/theme-data), last updated 2026-11-19.

Templates, the layout and snippets can read your ArrayQ data through three objects: `site`, `page` and `service`. Data is loaded only when a page uses it, so a page that never mentions `site.items` never loads them.

## site.provider

Your business profile, from your dashboard.

| Field | Type | Example |
| --- | --- | --- |
| `businessName` | Text | `Clearway Junk Co.` |
| `slug` | Text | `clearway-junk-co` |
| `about` | Text | Your about text, with line breaks |
| `logo` | Image URL | |
| `businessEmail` | Text | |
| `businessPhone` | Text | |
| `links` | List of URLs | Social and other links |
| `gallery` | List of image URLs | |

```liquid
<a href="tel:{{ site.provider.businessPhone }}">{{ site.provider.businessPhone }}</a>
<p>{{ site.provider.about | newline_to_br }}</p>
```

## site.services

Your **Active** services, oldest first. Each service has:

| Field | Type | Notes |
| --- | --- | --- |
| `_id` | Text | Use it for the checkout link: `/checkout/{{ service._id }}` |
| `title` | Text | |
| `slug` | Text | Use it for the service page: `/services/{{ service.slug }}` |
| `description` | HTML | Written in the dashboard editor |
| `cover` | Image URL | Can be empty |
| `category` | List | Each has `name` |
| `discount` | Object | Set only while an automatic discount is active. Has `displayName`, `type`, `value`, `description`, `coverImage`, `startDate` and `endDate` |
| `priceInputs` | List | The questions asked on checkout |
| `isSpecificItemSupported` | Yes or no | Whether customers pick items on checkout |

```liquid
{% for service in site.services %}
  <article>
    {% if service.cover %}<img src="{{ service.cover }}" alt="{{ service.title | escape }}">{% endif %}
    <h3><a href="/services/{{ service.slug }}">{{ service.title }}</a></h3>
    <p>{{ service.description | strip_html | truncate: 140 }}</p>
    <a href="/checkout/{{ service._id }}">Book now</a>
  </article>
{% else %}
  <p>No services yet.</p>
{% endfor %}
```

## service

On `templates/service.liquid`, `service` is the service whose slug is in the URL, with the same fields as above. On every other page it is empty.

```liquid
<h1>{{ service.title }}</h1>
{% if service.discount %}<p>{{ service.discount.displayName }}</p>{% endif %}
<div>{{ service.description }}</div>
<a href="/checkout/{{ service._id }}">Book {{ service.title }}</a>
```

## site.categories

All your categories. Each has `name`.

## site.items

Items customers can book, most popular first. Each item has:

| Field | Type |
| --- | --- |
| `name` | Text |
| `slug` | Text |
| `image` | Image URL |
| `price` | Number |
| `categories` | List, each with `name` |
| `subItems` | List, each with `name`, `image`, `price` and `status` |

```liquid
{% assign items = site.items | slice: 0, 8 %}
{% for item in items %}
  <li>{{ item.name }} {% if item.price %}${{ item.price }}{% endif %}</li>
{% endfor %}
```

## page

| Field | Example |
| --- | --- |
| `page.path` | The URL being shown, such as `/about` or `/services/junk-removal` |
| `page.slug` | The slug from the URL on the service page, otherwise empty |

## In snippets

`site`, `page` and `service` work inside every snippet. Anything else, such as the variable of a `for` loop, has to be passed:

```liquid
{% for service in site.services %}
  {% render 'service-card', service: service %}
{% endfor %}
```

## Search engine tags

Build titles and descriptions from your data, usually in a `seo` snippet that the layout renders in `head`:

```liquid
{% if service %}
  <title>{{ service.title }} | {{ site.provider.businessName }}</title>
  <meta name="description" content="{{ service.description | strip_html | truncate: 155 | escape }}">
  <link rel="canonical" href="/services/{{ service.slug }}">
{% else %}
  <title>{{ site.provider.businessName }}</title>
  <meta name="description" content="{{ site.provider.about | strip_html | truncate: 155 | escape }}">
{% endif %}
```

## Escaping

Output is not escaped automatically. Text typed in the dashboard can contain quotes or `<`, so add `| escape` whenever you put a value inside an HTML attribute:

```liquid
<img src="{{ service.cover }}" alt="{{ service.title | escape }}">
```

`service.description` is HTML on purpose. Output it as it is, or use `| strip_html` for plain text.

## Tags and filters

Themes support standard Liquid, the same language Shopify themes use:

- Tags: `if`, `unless`, `case`, `for`, `assign`, `capture`, `render`, `comment`, `raw` and more.
- Filters: `escape`, `strip_html`, `truncate`, `newline_to_br`, `date`, `upcase`, `downcase`, `slice`, `size`, `where`, `sort`, `map`, `default` and more.

Using a filter that does not exist stops the page from rendering, so check the spelling.

## Limits and caching

- A page must finish rendering within 2 seconds.
- A page that fails to render returns an error instead of a half-finished page. Fix the template and publish again.
- Rendered pages are cached for up to 1 minute. A change to a service in your dashboard shows on your site within a minute, without publishing again. A new publish shows immediately.
