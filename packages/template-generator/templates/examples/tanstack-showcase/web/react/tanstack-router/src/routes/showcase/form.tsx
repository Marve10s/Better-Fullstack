import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/showcase/form")({
  component: FormShowcase,
});

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// ── Traditional: manual form state ───────────────────────────────────
function TraditionalForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name) next.name = "Name is required";
    if (!values.email) next.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email))
      next.email = "Invalid email format";
    if (!values.password) next.password = "Password is required";
    else if (values.password.length < 8)
      next.password = "Must be at least 8 characters";
    if (values.password !== values.confirmPassword)
      next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(values);
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Manual useState × 4 fields + manual validation
      </p>
      {(["name", "email", "password", "confirmPassword"] as const).map((field) => (
        <div key={field}>
          <label className="mb-1 block text-xs font-medium capitalize">
            {field === "confirmPassword" ? "Confirm Password" : field}
          </label>
          <input
            type={field.includes("password") || field.includes("Password") ? "password" : "text"}
            value={values[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:border-foreground focus:outline-none"
          />
          {errors[field] && (
            <p className="mt-0.5 text-xs text-red-500">{errors[field]}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80"
      >
        Submit
      </button>
      {submitted && (
        <pre className="mt-2 rounded-md bg-muted p-2 text-xs">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </form>
  );
}

// ── TanStack Form ────────────────────────────────────────────────────
function TanStackFormDemo() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies FormValues,
    onSubmit: ({ value }) => setSubmitted(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-3"
    >
      <p className="text-sm text-muted-foreground">
        Declarative fields with inline validators
      </p>

      <form.Field
        name="name"
        validators={{
          onBlur: ({ value }) => (!value ? "Name is required" : undefined),
        }}
      >
        {(field) => (
          <div>
            <label className="mb-1 block text-xs font-medium">Name</label>
            <input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-md border border-primary/20 bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-0.5 text-xs text-red-500">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) => {
            if (!value) return "Email is required";
            if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div>
            <label className="mb-1 block text-xs font-medium">Email</label>
            <input
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-md border border-primary/20 bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-0.5 text-xs text-red-500">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onBlur: ({ value }) => {
            if (!value) return "Password is required";
            if (value.length < 8) return "Must be at least 8 characters";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div>
            <label className="mb-1 block text-xs font-medium">Password</label>
            <input
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-md border border-primary/20 bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-0.5 text-xs text-red-500">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="confirmPassword"
        validators={{
          onChangeListenTo: ["password"],
          onBlur: ({ value, fieldApi }) => {
            if (value !== fieldApi.form.getFieldValue("password"))
              return "Passwords do not match";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div>
            <label className="mb-1 block text-xs font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-md border border-primary/20 bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-0.5 text-xs text-red-500">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        className="w-full rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
      >
        Submit
      </button>
      {submitted && (
        <pre className="mt-2 rounded-md bg-primary/5 p-2 text-xs text-primary">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </form>
  );
}

// ── Page layout ──────────────────────────────────────────────────────
function FormShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        to="/showcase"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Showcase
      </Link>
      <h1 className="mb-2 text-3xl font-bold">TanStack Form</h1>
      <p className="mb-8 text-muted-foreground">
        Type-safe, headless form state with field-level validation, linked
        fields, and zero manual onChange boilerplate.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 rounded-t-lg border border-red-500/20 bg-red-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">
              Traditional: manual useState + validation
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-border p-4 opacity-75">
            <TraditionalForm />
          </div>
        </section>

        <section>
          <div className="mb-3 rounded-t-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              TanStack Form
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-primary/20 p-4">
            <TanStackFormDemo />
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Why TanStack Form?</strong> Manual
        form handling requires separate useState for each field, a validation
        function, and manual error clearing. TanStack Form provides field-level
        validators, linked field validation (confirm password watches password),
        and full TypeScript inference — all while staying headless.
      </div>
    </div>
  );
}
