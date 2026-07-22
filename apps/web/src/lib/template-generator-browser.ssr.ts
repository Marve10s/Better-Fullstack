const clientOnlyError = (): never => {
  throw new Error("Template preview generation is only available in the browser");
};

export const EMBEDDED_TEMPLATES = new Map<string, string>();
export const generateVirtualProject = clientOnlyError;
export const validatePreflightConfig = clientOnlyError;
