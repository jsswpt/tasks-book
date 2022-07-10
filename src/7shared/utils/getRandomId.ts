const random = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + min));
};

export const getRandomId = () => {
  const id = [];
  for (let i = 0; i < 20; i++) {
    const variance = random(4, 0);
    if (variance < 2) {
      id.push(random(9, 0));
    } else {
      let arr_en = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      let arr_EN = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];

      const variance2 = random(4, 0);
      if (variance2 < 2) {
        id.push(arr_en[random(arr_en.length, 0)]);
      } else {
        id.push(arr_EN[random(arr_EN.length, 0)]);
      }
    }
  }
  const finalid = id.join("");
  return finalid;
};
