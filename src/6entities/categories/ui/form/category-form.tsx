import { Button, Card, Input } from "@mui/material";
import React, { FC } from "react";
import styles from "./form.module.css";

import {
  IconPicker,
  IconProps,
} from "../../../../7shared/ui/icon-picker/icon-picker";

interface FormProps {
  setIsOpen: any;
  onSubmit: any;
  categoryName: string;
  setCategoryName: any;
  categoryIcon: string;
  setCategoryIcon: any;
}

export const CategoryForm: FC<FormProps> = ({
  setIsOpen,
  onSubmit,
  categoryIcon,
  categoryName,
  setCategoryIcon,
  setCategoryName,
}) => {
  return (
    <Card
      sx={{
        padding: "20px",
        width: "30%",
        background: "#FFFFFF",
        boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
        borderRadius: "10px",
      }}
    >
      <div className={styles.container}>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit();
            if (categoryIcon.length && categoryName.length) {
              setIsOpen(false);
            }
          }}
        >
          <div className={styles.form_container}>
            <p className={styles.title}>Новая категория</p>
            <div className={styles.input_container}>
              <Input
                fullWidth
                placeholder="Название категории"
                value={categoryName}
                onChange={(evt) => setCategoryName(evt.currentTarget.value)}
              />
            </div>
            <div
              className={styles.icon_picker_container}
              onClick={(evt) => {
                evt.stopPropagation();
              }}
            >
              <IconPicker
                onClick={(icon: IconProps) => setCategoryIcon(icon.iconName)}
              />
            </div>
            <div className={styles.buttons_container}>
              <Button
                variant="contained"
                color="warning"
                sx={{ width: "fit-content" }}
                onClick={() => setIsOpen(false)}
              >
                Отмена
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "fit-content" }}
              >
                Добавить
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
