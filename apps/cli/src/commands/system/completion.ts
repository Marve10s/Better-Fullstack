import { kebabCase, type parseRouter, type TrpcCli } from "trpc-cli";

type CommandJSON = ReturnType<TrpcCli["toJSON"]>;
type OptionJSON = NonNullable<CommandJSON["options"]>[number];
type RouterProcedures = ReturnType<typeof parseRouter>;

export const COMPLETION_SHELLS = ["bash", "zsh", "fish", "powershell"] as const;
export type CompletionShell = (typeof COMPLETION_SHELLS)[number];

/** Binaries published by create-better-fullstack and its create-bfs alias package. */
export const COMPLETION_BINARIES = ["create-better-fullstack", "create-bfs"];

type FlagKind = "switch" | "value" | "one" | "many";
type CompletionFlag = { name: string; kind: FlagKind; values: string[] };
/** Allowed values of one positional argument, keyed by "<command> <zero-based position>". */
type CompletionPositional = { key: string; values: string[] };
type CompletionModel = {
  commands: string[];
  defaultCommand: string;
  rootFlags: string[];
  flags: Map<string, CompletionFlag[]>;
  positionals: CompletionPositional[];
};

export type CompletionSource = {
  program: CommandJSON;
  /** The router as trpc-cli parses it; commander's JSON omits positional choices. */
  procedures: RouterProcedures;
  defaultCommand: string;
  hiddenFlags?: string[];
};

function toFlag(option: OptionJSON): CompletionFlag | undefined {
  const flags = option.flags ?? "";
  const name = flags.match(/--[\w-]+/)?.[0];
  if (!name) return undefined;
  const values = option.choices ?? [];
  const takesValue = /[<[]/.test(flags) && !flags.includes("[boolean]");
  const kind =
    values.length > 0 ? (option.variadic ? "many" : "one") : takesValue ? "value" : "switch";
  return { name, kind, values };
}

function toFlags(options: OptionJSON[] | undefined, hidden: Set<string>) {
  return (options ?? [])
    .map(toFlag)
    .filter((flag): flag is CompletionFlag => flag !== undefined && !hidden.has(flag.name));
}

function enumValues(schema: unknown) {
  if (typeof schema !== "object" || schema === null || !("enum" in schema)) return [];
  const values: unknown = schema.enum;
  return Array.isArray(values)
    ? values.filter((value): value is string => typeof value === "string")
    : [];
}

// trpc-cli maps the leading items of a tuple input to positional arguments, in order.
function toPositionals(procedures: RouterProcedures, commands: Set<string>) {
  return procedures.flatMap(([name, info]): CompletionPositional[] => {
    const command = kebabCase(name);
    const [schema] = info.inputSchemas.success ? info.inputSchemas.value : [];
    if (!commands.has(command) || !schema || !("prefixItems" in schema)) return [];
    const items: unknown = schema.prefixItems;
    if (!Array.isArray(items)) return [];
    return items.flatMap((item, position) => {
      const values = enumValues(item);
      return values.length > 0 ? [{ key: `${command} ${position}`, values }] : [];
    });
  });
}

function buildModel({ program, procedures, defaultCommand, hiddenFlags = [] }: CompletionSource) {
  const hidden = new Set(hiddenFlags);
  const help: CompletionFlag = { name: "--help", kind: "switch", values: [] };
  const commands = program.commands ?? [];
  const names = commands.flatMap((command) => (command.name ? [command.name] : []));
  return {
    commands: names,
    defaultCommand,
    rootFlags: toFlags(program.options, hidden).map((flag) => flag.name),
    flags: new Map(
      commands.map((command) => [command.name ?? "", [...toFlags(command.options, hidden), help]]),
    ),
    positionals: toPositionals(procedures, new Set(names)),
  } satisfies CompletionModel;
}

const shQuote = (value: string) => `'${value.replaceAll("'", `'\\''`)}'`;
const fishQuote = (value: string) => `'${value.replaceAll("\\", "\\\\").replaceAll("'", "\\'")}'`;
const psQuote = (value: string) => `'${value.replaceAll("'", "''")}'`;

function valueFlags(model: CompletionModel) {
  return [...model.flags].flatMap(([command, flags]) =>
    flags
      .filter((flag) => flag.kind !== "switch")
      .map(({ name, kind, values }) => ({ key: `${command} ${name}`, kind, values })),
  );
}

const flagNames = (flags: CompletionFlag[]) => flags.map((flag) => flag.name).join(" ");

// bash and zsh share the same case tables; only the word access and reply calls differ.
function shellCases(model: CompletionModel) {
  const values = valueFlags(model)
    .map(
      (flag) =>
        `    ${shQuote(flag.key)}) kind=${flag.kind}; values=${shQuote(flag.values.join(" "))} ;;`,
    )
    .join("\n");
  const flags = [...model.flags]
    .map(
      ([command, commandFlags]) =>
        `    ${shQuote(command)}) values=${shQuote(flagNames(commandFlags))}; takes=${shQuote(
          flagNames(commandFlags.filter((flag) => flag.kind !== "switch")),
        )} ;;`,
    )
    .join("\n");
  const positionals = model.positionals
    .map(
      (positional) =>
        `      ${shQuote(positional.key)}) choices=${shQuote(positional.values.join(" "))} ;;`,
    )
    .join("\n");
  const commandPattern = model.commands.map(shQuote).join("|");
  return { values, flags, positionals, commandPattern };
}

function renderBash(model: CompletionModel) {
  const { values, flags, positionals, commandPattern } = shellCases(model);
  return `# bash completion for ${COMPLETION_BINARIES.join(", ")}
_better_fullstack_completion() {
  local cur="\${COMP_WORDS[COMP_CWORD]}" prev="\${COMP_WORDS[COMP_CWORD-1]}"
  local command="\${COMP_WORDS[1]}" extra="" flag="" kind="" values="" i
  local takes="" choices="" start=2 position=0 skip=0
  case "$command" in
    ${commandPattern}) ;;
    *) command=${shQuote(model.defaultCommand)}; extra=${shQuote(model.rootFlags.join(" "))}; start=1 ;;
  esac
  if [[ $cur == = ]]; then
    cur=""
  elif [[ $prev == = ]]; then
    prev="\${COMP_WORDS[COMP_CWORD-2]}"
  fi
  if [[ $COMP_CWORD -eq 1 && $cur != -* ]]; then
    COMPREPLY=($(compgen -W ${shQuote(model.commands.join(" "))} -- "$cur"))
    return
  fi
  for ((i = COMP_CWORD - 1; i > 0; i--)); do
    if [[ \${COMP_WORDS[i]} == -* ]]; then
      flag="\${COMP_WORDS[i]}"
      break
    fi
  done
  case "$command $flag" in
${values}
  esac
  if [[ $cur != -* ]]; then
    if [[ $flag == "$prev" && $kind == value ]]; then
      return
    fi
    if [[ ($flag == "$prev" && -n $kind) || $kind == many ]]; then
      COMPREPLY=($(compgen -W "$values" -- "$cur"))
      return
    fi
  fi
  case "$command" in
${flags}
  esac
  if [[ $cur != -* ]]; then
    # Count the positional words before the cursor, skipping flags and the values they take.
    for ((i = start; i < COMP_CWORD; i++)); do
      if [[ \${COMP_WORDS[i]} == = ]]; then
        skip=1
      elif ((skip)); then
        skip=0
      elif [[ \${COMP_WORDS[i]} == -* ]]; then
        [[ " $takes " == *" \${COMP_WORDS[i]} "* ]] && skip=1
      else
        position=$((position + 1))
      fi
    done
    case "$command $position" in
${positionals}
    esac
    if [[ -n $choices ]]; then
      COMPREPLY=($(compgen -W "$choices" -- "$cur"))
      return
    fi
  fi
  COMPREPLY=($(compgen -W "$values $extra" -- "$cur"))
}
complete -o default -F _better_fullstack_completion ${COMPLETION_BINARIES.join(" ")}
`;
}

function renderZsh(model: CompletionModel) {
  const { values, flags, positionals, commandPattern } = shellCases(model);
  const [primary] = COMPLETION_BINARIES;
  return `#compdef ${COMPLETION_BINARIES.join(" ")}
_${primary}() {
  local cur="\${words[CURRENT]}" prev="\${words[CURRENT-1]}"
  local command="\${words[2]}" extra="" flag="" kind="" values="" i
  local takes="" choices="" start=3 position=0 skip=0
  case "$command" in
    ${commandPattern}) ;;
    *) command=${shQuote(model.defaultCommand)}; extra=${shQuote(model.rootFlags.join(" "))}; start=2 ;;
  esac
  if (( CURRENT == 2 )) && [[ $cur != -* ]]; then
    compadd -- ${model.commands.map(shQuote).join(" ")}
    return
  fi
  if [[ $cur == --*=* ]]; then
    flag="\${cur%%=*}" prev="\${cur%%=*}" cur="\${cur#*=}"
    compset -P '*='
  else
    for ((i = CURRENT - 1; i > 1; i--)); do
      if [[ \${words[i]} == -* ]]; then
        flag="\${words[i]%%=*}"
        break
      fi
    done
  fi
  case "$command $flag" in
${values}
  esac
  if [[ $cur != -* ]]; then
    if [[ $flag == "$prev" && $kind == value ]]; then
      _files
      return
    fi
    if [[ ($flag == "$prev" && -n $kind) || $kind == many ]]; then
      compadd -- \${=values}
      return
    fi
  fi
  [[ \${words[CURRENT]} == --*=* ]] && return
  case "$command" in
${flags}
  esac
  if [[ $cur != -* ]]; then
    # Count the positional words before the cursor, skipping flags and the values they take.
    for ((i = start; i < CURRENT; i++)); do
      if ((skip)); then
        skip=0
      elif [[ \${words[i]} == -* ]]; then
        [[ \${words[i]} != *=* && " $takes " == *" \${words[i]} "* ]] && skip=1
      else
        position=$((position + 1))
      fi
    done
    case "$command $position" in
${positionals}
    esac
    if [[ -n $choices ]]; then
      compadd -- \${=choices}
      return
    fi
  fi
  compadd -- \${=values} \${=extra}
}

if [[ "\${funcstack[1]}" == _${primary} ]]; then
  _${primary} "$@"
else
  compdef _${primary} ${COMPLETION_BINARIES.join(" ")}
fi
`;
}

function renderFish(model: CompletionModel) {
  const commands = model.commands.map(fishQuote).join(" ");
  const flagLines = [...model.flags].flatMap(([command, commandFlags]) =>
    commandFlags.flatMap((flag) => {
      const condition = fishQuote(`test (__better_fullstack_command) = ${command}`);
      const argument =
        flag.kind === "value"
          ? " -r"
          : flag.kind === "switch"
            ? ""
            : ` -x -a ${fishQuote(flag.values.join(" "))}`;
      const rule = `    complete -c $bin -n ${condition} -l ${flag.name.slice(2)}${argument}`;
      if (flag.kind !== "many") return [rule];
      // -l rules only complete the word right after the flag; keep offering list values after it.
      const listCondition = fishQuote(
        `test (__better_fullstack_command) = ${command}; and __better_fullstack_last_flag ${flag.name}`,
      );
      return [
        rule,
        `    complete -c $bin -f -n ${listCondition} -a ${fishQuote(flag.values.join(" "))}`,
      ];
    }),
  );
  const rootLines = model.rootFlags.map(
    (flag) =>
      `    complete -c $bin -n 'not __better_fullstack_explicit_command >/dev/null' -l ${flag.slice(2)}`,
  );
  const positionalLines = model.positionals.map(({ key, values }) => {
    const [command, position] = key.split(" ");
    const condition = fishQuote(
      `test (__better_fullstack_command) = ${command}; and test (__better_fullstack_position) = ${position}`,
    );
    return `    complete -c $bin -f -n ${condition} -a ${fishQuote(values.join(" "))}`;
  });
  const valueFlagCases = [...model.flags].flatMap(([command, commandFlags]) => {
    const names = commandFlags.filter((flag) => flag.kind !== "switch").map((flag) => flag.name);
    if (names.length === 0) return [];
    return [
      `        case ${fishQuote(command)}`,
      `            printf '%s\\n' ${names.map(fishQuote).join(" ")}`,
    ];
  });
  return `# fish completion for ${COMPLETION_BINARIES.join(", ")}
function __better_fullstack_explicit_command
    set -l tokens (commandline -opc)
    set -q tokens[2]; and contains -- $tokens[2] ${commands}; and echo $tokens[2]
end

function __better_fullstack_command
    __better_fullstack_explicit_command; or echo ${fishQuote(model.defaultCommand)}
end

function __better_fullstack_value_flags
    switch (__better_fullstack_command)
${valueFlagCases.join("\n")}
    end
end

# Counts the positional words before the cursor, skipping flags and the values they take.
function __better_fullstack_position
    set -l tokens (commandline -opc)
    set -l start 2
    __better_fullstack_explicit_command >/dev/null; and set start 3
    set -l takes (__better_fullstack_value_flags)
    set -l position 0
    set -l skip 0
    set -l index 0
    for token in $tokens
        set index (math $index + 1)
        if test $index -lt $start
            continue
        else if test $skip -eq 1
            set skip 0
        else if string match -q -- '-*' $token
            if not string match -q -- '*=*' $token; and contains -- $token $takes
                set skip 1
            end
        else
            set position (math $position + 1)
        end
    end
    echo $position
end

function __better_fullstack_last_flag
    for token in (commandline -opc)[-1..1]
        if string match -q -- '-*' $token
            test (string split -m1 = -- $token)[1] = $argv[1]
            return $status
        end
    end
    return 1
end

for bin in ${COMPLETION_BINARIES.join(" ")}
    complete -c $bin -f -n 'test (count (commandline -opc)) -eq 1' -a ${fishQuote(model.commands.join(" "))}
${[...rootLines, ...flagLines, ...positionalLines].join("\n")}
end
`;
}

function renderPowerShell(model: CompletionModel) {
  const list = (items: string[]) => `@(${items.map(psQuote).join(", ")})`;
  const flags = [...model.flags]
    .map(
      ([command, commandFlags]) =>
        `        ${psQuote(command)} = ${list(commandFlags.map((flag) => flag.name))}`,
    )
    .join("\n");
  const values = valueFlags(model)
    .map((flag) => `        ${psQuote(flag.key)} = ${list([flag.kind, ...flag.values])}`)
    .join("\n");
  const positionals = model.positionals
    .map((positional) => `        ${psQuote(positional.key)} = ${list(positional.values)}`)
    .join("\n");
  return `# PowerShell completion for ${COMPLETION_BINARIES.join(", ")}
Register-ArgumentCompleter -Native -CommandName ${list(COMPLETION_BINARIES)} -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
    $commands = ${list(model.commands)}
    $flags = @{
${flags}
    }
    $values = @{
${values}
    }
    $positionals = @{
${positionals}
    }
    $words = @($commandAst.CommandElements | Where-Object { $_.Extent.EndOffset -lt $cursorPosition } | ForEach-Object { $_.ToString() })
    $command = ${psQuote(model.defaultCommand)}
    $prefix = ''
    $extra = ${list(model.rootFlags)}
    $start = 1
    if ($words.Count -gt 1 -and $commands -contains $words[1]) {
        $command = $words[1]
        $extra = @()
        $start = 2
    }
    if ($wordToComplete -match '^(--[^=]+)=(.*)$') {
        $entry = $values["$command $($Matches[1])"]
        $prefix = "$($Matches[1])="
        $wordToComplete = $Matches[2]
        $candidates = if ($entry -and $entry[0] -ne 'value') { $entry | Select-Object -Skip 1 } else { @() }
    } elseif ($words.Count -eq 1 -and -not $wordToComplete.StartsWith('-')) {
        $candidates = $commands
    } else {
        $flag = $words | Select-Object -Skip 1 | Where-Object { $_.StartsWith('-') } | Select-Object -Last 1
        $flag = $flag -replace '=.*$', ''
        $entry = $values["$command $flag"]
        $kind = if ($entry) { $entry[0] } else { '' }
        $isPrev = $flag -and $flag -eq $words[-1]
        if (-not $wordToComplete.StartsWith('-') -and $isPrev -and $kind -eq 'value') {
            return
        }
        # Count the positional words before the cursor, skipping flags and the values they take.
        $position = 0
        $skip = $false
        foreach ($word in @($words | Select-Object -Skip $start)) {
            if ($skip) {
                $skip = $false
            } elseif ($word.StartsWith('-')) {
                $skip = -not $word.Contains('=') -and $values.ContainsKey("$command $word")
            } else {
                $position++
            }
        }
        $choices = $positionals["$command $position"]
        if (-not $wordToComplete.StartsWith('-') -and (($isPrev -and $kind) -or $kind -eq 'many')) {
            $candidates = $entry | Select-Object -Skip 1
        } elseif (-not $wordToComplete.StartsWith('-') -and $choices) {
            $candidates = $choices
        } else {
            $candidates = $flags[$command] + $extra
        }
    }
    $candidates | Where-Object { $_ -like "$wordToComplete*" } | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new("$prefix$_", $_, 'ParameterValue', $_)
    }
}
`;
}

const renderers = {
  bash: renderBash,
  zsh: renderZsh,
  fish: renderFish,
  powershell: renderPowerShell,
} satisfies Record<CompletionShell, (model: CompletionModel) => string>;

export function renderCompletionScript(shell: CompletionShell, source: CompletionSource) {
  return renderers[shell](buildModel(source));
}
