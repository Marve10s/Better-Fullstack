# Better-Fullstack

Better-Fullstack scaffolds project templates from selected stack technologies while preserving valid combinations between project layers, tools, and ecosystem adapters.

## Language

**Stack Part**:
A selected tool bound to one role, one ecosystem adapter, and optionally one owning stack part.
_Avoid_: option, category item, ecosystem choice

**Role Binding**:
The relationship that says a tool is being used for a specific role in a specific context.
_Avoid_: tag, category membership

**Primary Role**:
A top-level project role that owns generated structure in v1: frontend, backend, mobile, or standalone database.
_Avoid_: section, tab, ecosystem

**Capability Role**:
A scoped role that attaches behavior or infrastructure to a primary role, such as API, ORM, auth, deploy, caching, or observability.
_Avoid_: subcategory, plugin

**Provided Capability**:
A capability role supplied by another stack part rather than selected independently.
_Avoid_: implicit option, hidden dependency

**Legacy Flat Config**:
The pre-graph configuration shape with one project-level ecosystem and category fields such as frontend, backend, database, and orm.
_Avoid_: old schema, classic mode

## Relationships

- A **Stack Part** has exactly one **Role Binding**.
- A **Primary Role** may own zero or more **Capability Roles**.
- A **Provided Capability** belongs to the stack graph as a derived **Stack Part**.
- The **Legacy Flat Config** is a derived compatibility view when graph-shaped `stackParts` exist.

## Example Dialogue

> **Dev:** "Can Hono appear while choosing a TypeScript frontend?"
> **Domain expert:** "No — Hono can be a **Stack Part** only through a backend **Role Binding**, so frontend discovery must filter it out."

## Flagged Ambiguities

- "ecosystem" used to mean the whole project language family; resolved: ecosystem is part-scoped in the stack graph, while project-level ecosystem is part of the **Legacy Flat Config**.
- "database" can mean a standalone project layer or a backend/frontend capability; resolved: it is represented by separate **Role Bindings** using the same tool ID.
