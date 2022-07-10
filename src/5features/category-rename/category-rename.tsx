import { Input, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { useAppDispatch } from "../../1app/store";
import { renameCategoryThunk } from "../../6entities/categories/model";
import { CategoryChange } from "../../6entities/categories/ui/category-change/category-change";
import { CategoryProps } from "../../6entities/interfaces";

interface RenameProps {
  children: React.ReactNode | React.ReactChild;
  category: CategoryProps;
}

export const CategoryRename: FC<RenameProps> = ({ category, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(category.title);
  const dispatch = useAppDispatch();

  const renameCategory = () => {
    dispatch(
      renameCategoryThunk({ category: category, newName: newCategoryName })
    );
  };

  return (
    <>
      <CategoryChange
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={renameCategory}
        title="Изменить имя категории"
        categoryName={category.title}
        buttonIsDisabled={category.title === newCategoryName ? true : false}
      >
        <Input
          size="small"
          fullWidth
          value={newCategoryName}
          onChange={(evt: any) => setNewCategoryName(evt.target.value)}
          placeholder="Введите новое имя категории"
        />
      </CategoryChange>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
};
