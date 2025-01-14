const interpolate = (template: string, ...args: string[]) => {
  return template.replace(/\{(\d+)\}/g, (_, index) => args[index]);
};
export default interpolate;
