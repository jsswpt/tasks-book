import React, { FC } from "react";
import { availableIcons } from "../icon-picker/icon-picker";

const icons = availableIcons;

export interface IconSelectorProps {
  name: string;
}

export const IconSelector: FC<IconSelectorProps> = ({ name }) => {
  const filtredIcons = icons.filter((item) => {
    if (item.iconName === name) {
      return item;
    } else {
      return;
    }
  });

  if (filtredIcons.length) {
    return filtredIcons[0].icon;
  } else {
    return <></>;
  }
};
