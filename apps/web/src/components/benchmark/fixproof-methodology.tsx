import { FIXPROOF_THEME_VARS } from "@/components/benchmark/fixproof-outcome";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const SECTION_HEADING = "font-mono text-xl font-bold tracking-[-0.02em] sm:text-2xl";

const BODY = "text-[14px] leading-relaxed text-muted-foreground";

function Step({ index, children }: { index: number; children: string }) {
  return (
    <li className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 py-2.5">
      <span className="font-mono text-[12px] tabular-nums text-[#9c9a93] dark:text-[#6c6a61]">
        {String(index).padStart(2, "0")}
      </span>
      <span className={BODY}>{children}</span>
    </li>
  );
}

export function FixproofProvenance() {
  return (
    <section aria-labelledby="fixproof-provenance">
      <h2 id="fixproof-provenance" className={SECTION_HEADING}>
        {m.fixproofProvenanceHeading()}
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed">{m.fixproofProvenanceIntro()}</p>

      <div
        className={cn(
          FIXPROOF_THEME_VARS,
          "mt-6 grid gap-x-10 gap-y-6 rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614]",
        )}
      >
        <div>
          <p className={BODY}>{m.fixproofProvenanceSetup()}</p>
          <ol className="mt-2 divide-y divide-[var(--fx-rule)]">
            <Step index={1}>{m.fixproofProvenanceStep1()}</Step>
            <Step index={2}>{m.fixproofProvenanceStep2()}</Step>
            <Step index={3}>{m.fixproofProvenanceStep3()}</Step>
            <Step index={4}>{m.fixproofProvenanceStep4()}</Step>
            <Step index={5}>{m.fixproofProvenanceStep5()}</Step>
          </ol>
        </div>

        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-[13px]">{m.fixproofProvenanceValidationLabel()}</dt>
            <dd className={cn(BODY, "mt-1")}>{m.fixproofProvenanceValidation()}</dd>
          </div>
          <div>
            <dt className="font-medium text-[13px]">{m.fixproofProvenancePendingLabel()}</dt>
            <dd className={cn(BODY, "mt-1")}>{m.fixproofProvenancePending()}</dd>
          </div>
          <div>
            <dt className="font-medium text-[13px]">{m.fixproofProvenanceVoidedLabel()}</dt>
            <dd className={cn(BODY, "mt-1")}>{m.fixproofProvenanceVoided()}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function MethodBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <h3 className="font-medium text-[15px]">{heading}</h3>
      <p className={cn(BODY, "mt-2")}>{body}</p>
    </div>
  );
}

export function FixproofMethodology() {
  return (
    <section aria-labelledby="fixproof-methodology">
      <h2 id="fixproof-methodology" className={SECTION_HEADING}>
        {m.fixproofMethodHeading()}
      </h2>
      <div className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <MethodBlock heading={m.fixproofMethodTaskHeading()} body={m.fixproofMethodTaskBody()} />
        <MethodBlock
          heading={m.fixproofMethodHiddenHeading()}
          body={m.fixproofMethodHiddenBody()}
        />
        <MethodBlock
          heading={m.fixproofMethodAdmissionHeading()}
          body={m.fixproofMethodAdmissionBody()}
        />
        <MethodBlock heading={m.fixproofMethodIndexHeading()} body={m.fixproofMethodIndexBody()} />
        <MethodBlock
          heading={m.fixproofMethodExcludedHeading()}
          body={m.fixproofMethodExcludedBody()}
        />
        <MethodBlock
          heading={m.fixproofMethodSealedHeading()}
          body={m.fixproofMethodSealedBody()}
        />
      </div>
    </section>
  );
}
