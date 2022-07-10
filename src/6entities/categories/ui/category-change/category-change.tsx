import { StringLike } from "@firebase/util";
import { Modal, Card, Button } from "@mui/material";
import React, { FC, useState } from "react";

import styles from "./change.module.css";

interface ChangeProps {
  isOpen: boolean;
  setIsOpen: any;
  children?: React.ReactNode | React.ReactChild;
  onSubmit: any;
  title: string;
  categoryName: string;
  buttonTitle?: string;
  buttonIsDisabled?: boolean;
}

export const CategoryChange: FC<ChangeProps> = ({
  isOpen,
  setIsOpen,
  children,
  onSubmit,
  title,
  categoryName,
  buttonTitle,
  buttonIsDisabled,
}) => {
  return (
    <Modal
      open={isOpen}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        sx={{
          padding: "20px",
          width: "30%",
          background: "#FFFFFF",
          boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
          borderRadius: "10px",
        }}
      >
        <form
          onSubmit={(evt: any) => {
            evt.preventDefault();
            onSubmit();
          }}
          className={styles.form}
        >
          <div className={styles.top}>
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>
              Категория:{" "}
              <span className={styles.subtitle_addon}>{categoryName}</span>
            </p>
          </div>
          <div className={styles.main}>{children}</div>
          <div className={styles.buttons_container}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </Button>
            <Button
              disabled={buttonIsDisabled}
              variant="contained"
              color={
                buttonTitle?.toLowerCase() === "удалить" ? "warning" : "primary"
              }
              type="submit"
            >
              {buttonTitle ? buttonTitle : "Изменить"}
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};
