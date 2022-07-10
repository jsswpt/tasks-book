import { Input } from "@mui/material";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../1app/store";
import {
  removeCategoryThunk,
  renameCategoryThunk,
} from "../../6entities/categories/model";
import { CategoryChange } from "../../6entities/categories/ui/category-change/category-change";
import { CategoryProps } from "../../6entities/interfaces";

interface RemoveProps {
  children: React.ReactNode | React.ReactChild;
  category: CategoryProps;
}

export const CategoryRemove: FC<RemoveProps> = ({ category, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const removeCategory = () => {
    dispatch(removeCategoryThunk({ categoryId: category.id }));
    navigate("/");
  };

  return (
    <>
      <CategoryChange
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={removeCategory}
        title="Удалить категорию"
        categoryName={category.title}
        buttonTitle="Удалить"
      ></CategoryChange>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
};
