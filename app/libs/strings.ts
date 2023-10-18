export const capitalize = (string: string) => {
  return string
    .split(' ')
    .map((str) => {
      return str[0].toUpperCase() + str.slice(1);
    })
    .join();
};
