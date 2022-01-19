export const isMultiple = (value) => (value === 0 || value > 1 ? "s" : "");
export const toUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
