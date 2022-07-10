import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { TaskEdit } from "../../5features/task-edit/task-edit";
import { TaskRemove } from "../../5features/task-remove/rask-remove";
import { TaskToggleState } from "../../5features/task-toggle-state/task-toggle-state";
import { TaskProps } from "../../6entities/interfaces";
import { dateFormatter } from "../../7shared/utils/dateFormatter";

import styles from "./task.module.css";

interface TaskUiProps {
  task: TaskProps;
}

export const Task: FC<TaskUiProps> = ({ task }) => {
  const [isOver, setIsOver] = useState(false);

  const [creationDate, setCreationDate] = useState("");
  const [deadline, setDeadline] = useState("");

  const changeDates = () => {
    setCreationDate(
      `${dateFormatter(dayjs(task.creationDate).date())}.
      ${dateFormatter(dayjs(task.creationDate).month(), true)}.
      ${dateFormatter(dayjs(task.creationDate).year())} ${dateFormatter(
        dayjs(task.creationDate).hour()
      )}:${dateFormatter(dayjs(task.creationDate).minute())}`
    );
    setDeadline(`${dateFormatter(dayjs(task.deadLine).date())}.
      ${dateFormatter(dayjs(task.deadLine).month(), true)}.
      ${dateFormatter(dayjs(task.deadLine).year())} ${dateFormatter(
      dayjs(task.deadLine).hour()
    )}:${dateFormatter(dayjs(task.deadLine).minute())}`);
  };

  useEffect(() => {
    changeDates();
  }, []);

  return (
    <li
      className={styles.task}
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <div className={styles.task_container}>
        {isOver && (
          <div className={styles.isDone}>
            <TaskToggleState task={task} />
          </div>
        )}
        <p
          className={
            task.isDone ? `${styles.title} ${styles.done}` : styles.title
          }
        >
          {task.title}
        </p>
        {isOver && (
          <div className={styles.settings}>
            <TaskEdit task={task} />
            <TaskRemove taskid={task.id} isDone={task.isDone} />
          </div>
        )}
        <div className={styles.dates}>
          <p className={styles.date}>Создано: {creationDate}</p>
          <p className={styles.date}>Дедлайн: {deadline}</p>
          <p className={styles.date}>Приоритет: {task.priority}</p>
        </div>
      </div>
    </li>
  );
};
