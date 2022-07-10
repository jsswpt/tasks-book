export const checker = (title: string) => {
  const newArray: any = [];
  title
    .split(" ")
    .map((item) => {
      if (item.length > 1) {
        item.split("").forEach((i) => newArray.push(i));
      } else {
        newArray.push(item);
      }
    })
    .join();

  if (newArray.length < 3) {
    return false;
  } else {
    return true;
  }
};
