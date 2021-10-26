export const generateWord = (): string => {
  return Math.random().toString(36).slice(2);
};
