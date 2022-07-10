export const dateFormatter = (
  item: any,
  increment?: boolean,
  value?: number
) => {
  if (increment) {
    item += item + value ? value : 1;
  }
  if (item < 10) {
    return `0${item}`;
  } else {
    return item;
  }
};
