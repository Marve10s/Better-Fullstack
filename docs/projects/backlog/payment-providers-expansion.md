# Payment Providers Expansion

Polar, Stripe, Lemon Squeezy, Paddle, Dodo, Creem, Autumn, and Commet are shipped. Better Auth
payment plugin configuration and the organizations variant are generated. This project now tracks
one product-level composition.

## Organization-Aware SaaS Billing Preset

- [ ] Add an opinionated preset combining Better Auth organizations with a supported payment
      provider, organization-level subscriptions, entitlement checks, and generated dashboard
      routes.

The preset must remain an explicit composition of Stack Parts. It must not introduce configuration
outside the shared schemas, compatibility engine, graph projections, and template handlers.

Completion requires:

- compatibility behavior for unsupported frontend/backend/database combinations;
- dependencies, environment variables, auth plugins, payment helpers, and routes that agree;
- CLI, web builder, and MCP parity;
- generated-project assertions for both supported and rejected combinations;
- provider setup and webhook documentation.

## Evidence closure

The organization-aware billing composition currently fails at `runtime-verified`. Provider
packages, environment files, and generated helpers do not prove subscription behavior.

The closing recipe must generate one named organization preset against a provider sandbox. It must
create an organization subscription, deliver a signed webhook to the generated route, persist the
entitlement, allow an entitled request, reject an unentitled request, and verify the documented
replay behavior. The recipe must record the provider, API version, fixture identity, and secret
handling limit.
