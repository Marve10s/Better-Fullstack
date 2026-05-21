declare module "date-fns" {
  export function format(date: Date | number | string, formatStr: string): string;
  export function parseISO(argument: string): Date;
}
