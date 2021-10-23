export const generateCode = (): string => {
  let randomNumber: number = Math.floor(Math.random() * 1000000);
  if (randomNumber > 10000000) {
    randomNumber -= 100000;
  } else if (randomNumber < 1000000) {
    randomNumber += 900000;
  }
  return randomNumber.toString();
};
