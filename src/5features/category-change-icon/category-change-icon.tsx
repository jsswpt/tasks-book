import { Button, Card, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import { useAppDispatch } from "../../1app/store";
import { changeIconThunk } from "../../6entities/categories/model";
import { CategoryChange } from "../../6entities/categories/ui/category-change/category-change";
import { CategoryProps } from "../../6entities/interfaces";
import {
  IconPicker,
  IconProps,
} from "../../7shared/ui/icon-picker/icon-picker";

interface ChangeIconProps {
  category: CategoryProps;
  children: React.ReactNode | React.ReactChild;
}

export const CategoryChangeIcon: FC<ChangeIconProps> = ({
  category,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(category.icon);
  const dispatch = useAppDispatch();

  const changeIcon = () => {
    dispatch(changeIconThunk({ categoryId: category.id, icon: currentIcon }));
  };

  return (
    <>
      <CategoryChange
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={changeIcon}
        title="Изменить иконку"
        categoryName={category.title}
        buttonIsDisabled={currentIcon === category.icon ? true : false}
      >
        <IconPicker
          iconName={currentIcon}
          onClick={(icon: IconProps) => {
            setCurrentIcon(icon.iconName);
          }}
        />
      </CategoryChange>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
};
