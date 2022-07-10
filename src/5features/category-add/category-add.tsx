import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import styles from "./button.module.css";
import { MdAddBox } from "react-icons/md";
import { CategoryForm } from "../../6entities/categories/ui/form/category-form";
import { useAppDispatch, useAppSelector } from "../../1app/store";
import { addCategoryThunk } from "../../6entities/categories/model";

export const CategoryAdd = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setcategoryIcon] = useState("");

  const { user } = useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();

  const addCategory = () => {
    dispatch(
      addCategoryThunk({
        categoryIcon: categoryIcon,
        categoryName: categoryName,
        userid: user.id,
      })
    );
  };

  return (
    <>
      <Modal
        open={isOpen}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CategoryForm
          setIsOpen={setIsOpen}
          onSubmit={addCategory}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          categoryIcon={categoryIcon}
          setCategoryIcon={setcategoryIcon}
        />
      </Modal>
      <Button
        size="small"
        sx={{ width: "fit-content", textTransform: "none" }}
        startIcon={<MdAddBox />}
        onClick={() => setIsOpen(true)}
      >
        <p className={styles.button_inner}>Добавить</p>
      </Button>
    </>
  );
};
