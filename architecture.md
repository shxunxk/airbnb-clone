# Production Architecture

```mermaid
flowchart LR
  user[Desktop and mobile clients] --> cdn[Edge CDN / WAF]
  cdn --> web[React SSR web app]
  web --> api[API gateway]
  api --> auth[Identity service]
  api --> listings[Listing and availability service]
  api --> booking[Booking and payments service]
  api --> review[Reviews service]
  listings --> search[OpenSearch cluster]
  listings --> db[(PostgreSQL primary + read replicas)]
  booking --> db
  review --> db
  api --> cache[(Redis cache / sessions / locks)]
  listings --> object[(Object storage for photos)]
  object --> img[Image resize pipeline]
  booking --> queue[Event bus]
  queue --> notifications[Email / push notifications]
  queue --> analytics[Warehouse and observability]
  web --> deploy[Vercel edge deployment]
  api --> deployApi[Container platform / autoscaling]
```

The frontend is served from an edge CDN with SSR for SEO and route-level caching. Stateless services scale horizontally behind an API gateway; PostgreSQL remains the source of truth for transactional booking state with read replicas for browsing. Redis handles short-lived availability reads and distributed booking locks. Search is independently scaled in OpenSearch, while original media lives in object storage and passes through an image resizing pipeline before CDN delivery. Booking events flow through a durable bus to notifications and analytics so user-facing transactions are not blocked by side effects.
