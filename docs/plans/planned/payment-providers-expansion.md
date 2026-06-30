# Payment Providers Expansion

Current: Polar, Stripe, Lemon Squeezy, Paddle, Dodo. Multiple new providers requested on better-t-stack (#974, #820, #716, #676). Status refreshed on 2026-06-30.

---

## Already Supported

| Provider | Type | Notes |
|----------|------|-------|
| **Stripe** | Full-service | Industry standard. Cards, subscriptions, invoicing. |
| **Polar** | MoR | Open-source friendly. Convex + Better Auth support added recently. |
| **Lemon Squeezy** | MoR | Simple MoR for digital products. |
| **Paddle** | MoR | Tax compliance, B2B invoicing. |
| **Dodo** | MoR | Cheapest MoR. Has adapters for Hono, Express, Next, TanStack, Better-Auth, Convex, Svelte, React Native. |

---

## New Providers to Add

### Creem.io (better-t-stack #820)

- [ ] Add `creem` — MoR (Merchant of Record). Cheapest in the market per their claims. Has a Better Auth plugin (`@creem/better-auth`). Webhook-based, simple API.
  - **Why:** Better Auth plugin means tight integration with our most popular auth choice.
  - **SDK:** `@creem/sdk` for Node.js
  - **Template:** Webhook handler + checkout session creation + subscription management

### Autumn (better-t-stack #676)

- [ ] Add `autumn` — billing infrastructure for SaaS and AI companies. Plan-first model (define plans, attach features, meter usage). Supports Convex backend. Has CLI setup workflow (`npx autumn setup`).
  - **Why:** AI/usage-based billing is a growing need. Convex integration is a differentiator.
  - **SDK:** `autumn-js`
  - **Template:** Plan definition + feature gating + usage metering + webhook handler

### Commet (better-t-stack #716)

- [ ] Add `commet` — all-in-one billing for SaaS and AI. Plan-first model with entitlements. REST API with webhooks.
  - **Why:** Similar to Autumn but different pricing/features. Worth evaluating for SaaS use case.
  - **SDK:** TBD — verify SDK availability
  - **Template:** Plan management + entitlement checks + usage reporting

---

## Better Auth Payment Plugins

Better Auth has first-party plugins for payment providers. We should leverage these when `auth = better-auth`:

| Provider | Plugin | Status |
|----------|--------|--------|
| Stripe | `@better-auth/stripe` | Existing provider; still verify generated plugin depth |
| Polar | Custom integration | Already implemented |
| Creem | `@creem/better-auth` | New — community plugin |

- [ ] Ensure Better Auth payment plugins are auto-installed when both auth + payments are selected
- [ ] Generate proper plugin configuration in `auth.ts`

---

## Better Auth Organizations Plugin (better-t-stack #839)

Related but distinct — the organizations plugin enables multi-tenant SaaS billing:

- [x] Add Better Auth `organizations` plugin support ✅
  - Team/org creation, member roles, invitations
  - Pairs naturally with payment providers (org-level subscriptions)
  - Schema: add `organization` table to auth schema
  - Shipped as the `better-auth-organizations` auth option with server/client plugin wiring and generated organization/member/invitation schema across supported auth database adapters

### Remaining SaaS Billing Follow-Up

- [ ] Add an opinionated SaaS billing preset that combines Better Auth organizations with a payment provider, org-level subscription tables, entitlement checks, and generated dashboard routes.

---

## Files to Touch Per Provider

- `packages/types/src/schemas.ts` — add to `PaymentsSchema`
- `packages/template-generator/src/processors/payment-deps.ts` — add dependencies
- `packages/template-generator/src/processors/env-vars.ts` — add env variables
- `packages/template-generator/templates/payments/{name}/` — new templates
- `apps/web/src/lib/constant.ts` — builder entry
- `apps/web/src/lib/tech-icons.ts` — icon
- `apps/web/src/lib/tech-resource-links.ts` — docs/github links
- `apps/cli/src/helpers/core/post-installation.ts` — setup instructions

---

## Priority Order

1. **Creem.io** — Better Auth plugin makes integration clean
2. **Autumn** — AI/usage billing + Convex support
3. **Better Auth payment plugin wiring** — Stripe/Creem-style plugin integration where it improves generated auth config
4. **SaaS billing preset** — Better Auth organizations + payments + entitlement checks
5. **Commet** — evaluate SDK maturity first
