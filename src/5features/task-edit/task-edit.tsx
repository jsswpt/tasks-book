import { Modal } from "@mui/material";
import { FC, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useAppDispatch } from "../../1app/store";
import { TaskProps } from "../../6entities/interfaces";
import { changeTaskThunk } from "../../6entities/tasks/model";
import { TaskForm } from "../../6entities/tasks/ui/add-form/task-form";
import styles from "../task.module.css";

interface TaskEdit {
  task: TaskProps;
}

export const TaskEdit: FC<TaskEdit> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const changeTask = (
    categoryid: string,
    deadLine: Date | null,
    title: string,
    priority: number
  ) => {
    dispatch(changeTaskThunk({ categoryid, deadLine, priority, task, title }));
  };

  return (
    <>
      <Modal
        open={isOpen}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TaskForm
          close={() => setIsOpen(false)}
          onSubmit={changeTask}
          actionTitle="Изменить задачу"
          buttonInner="Изменить"
          task={task}
        />
      </Modal>
      <FiEdit className={styles.icon} onClick={() => setIsOpen(true)} />
    </>
  );
};
