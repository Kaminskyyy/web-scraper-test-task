export function omit(obj: any, key: string | number): any {
  const { [key]: omitted, ...rest } = obj;

  return rest;
}
