import { Button, Card, Modal } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../1app/store";
import { addTaskThunk } from "../../6entities/tasks/model";
import { TaskForm } from "../../6entities/tasks/ui/add-form/task-form";

export const TaskAdd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();
  const addTask = (
    categoryid: string,
    deadLine: Dayjs | null,
    title: string,
    priority: number
  ) => {
    dispatch(
      addTaskThunk({
        task: {
          categoryid: categoryid,
          deadLine: dayjs(deadLine),
          title: title,
          priority: priority,
          userid: user.id,
        },
      })
    );
  };

  return (
    <>
      <Modal
        open={isOpen}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <TaskForm close={() => setIsOpen(false)} onSubmit={addTask} />
      </Modal>
      <Button
        variant="contained"
        disableElevation
        startIcon={<MdOutlineAddCircleOutline />}
        sx={{
          background: "#3F88C5",
          borderRadius: "8px",
        }}
        onClick={() => setIsOpen(true)}
      >
        Новая задача
      </Button>
    </>
  );
};
