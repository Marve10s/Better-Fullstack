const EM_DASH = "\u2014";

interface Fix {
  range: [number, number];
  text: string;
}

interface Fixer {
  replaceTextRange(range: [number, number], text: string): Fix;
}

interface LineColumn {
  line: number;
  column: number;
}

interface RuleContext {
  sourceCode: {
    text: string;
    getLocFromIndex(offset: number): LineColumn;
  };
  report(diagnostic: {
    loc: { start: LineColumn; end: LineColumn };
    messageId: string;
    fix: (fixer: Fixer) => Fix;
  }): void;
}

export const noEmDash = {
  meta: {
    type: "suggestion",
    docs: { description: "Disallow em dashes in source text, including strings and comments." },
    fixable: "code",
    messages: { emDash: "Em dash found. Write a hyphen instead." },
  },
  create(context: RuleContext) {
    return {
      Program() {
        const { text, getLocFromIndex } = context.sourceCode;

        for (
          let index = text.indexOf(EM_DASH);
          index !== -1;
          index = text.indexOf(EM_DASH, index + 1)
        ) {
          const range: [number, number] = [index, index + EM_DASH.length];
          context.report({
            loc: { start: getLocFromIndex(index), end: getLocFromIndex(range[1]) },
            messageId: "emDash",
            fix: (fixer) => fixer.replaceTextRange(range, "-"),
          });
        }
      },
    };
  },
};

export default {
  meta: { name: "bfs" },
  rules: { "no-em-dash": noEmDash },
};
