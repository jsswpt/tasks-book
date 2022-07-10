import React, { FC, useState } from "react";

import styles from "../task.module.css";

import { MdDeleteOutline } from "react-icons/md";
import { Button, Card, Modal } from "@mui/material";
import { useAppDispatch } from "../../1app/store";
import { removeTaskThunk } from "../../6entities/tasks/model";

interface RemoveProps {
  taskid: string;
  isDone: boolean;
}

export const TaskRemove: FC<RemoveProps> = ({ taskid, isDone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(removeTaskThunk({ isDone, taskid }));
  };
  return (
    <>
      <Modal
        open={isOpen}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Card
          sx={{
            padding: "20px",
            width: "50%",
            background: "#FFFFFF",
            boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
            borderRadius: "10px",
          }}
        >
          <div className={styles.container}>
            <div className={styles.block}>
              <p className={styles.title}>Вы уверены?</p>
            </div>
            <form
              className={styles.form}
              onSubmit={(evt: any) => {
                evt.preventDefault();
                setIsOpen(false);
                removeTask();
              }}
            >
              <div className={styles.block_options}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setIsOpen(false)}
                  sx={{
                    width: "126px",
                    height: "42px",
                    background: "#F05454",
                    borderRadius: "8px",
                    fontFamily: "Nunito",
                  }}
                >
                  Отмена
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="warning"
                  sx={{
                    width: " 126px",
                    height: "42px",
                    borderRadius: "8px",
                    fontFamily: "Nunito",
                  }}
                >
                  Удалить
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </Modal>
      <MdDeleteOutline
        className={`${styles.icon} ${styles.trash}`}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
};
