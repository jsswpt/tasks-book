import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../1app/store";
import { getTasksThunk } from "../../../6entities/tasks/model";
import { Task } from "../../../4widgets/task/task";

import styles from "../app.module.css";

import "../../../1app/index.css";
import { Loader } from "../../../7shared/ui/Loader";
import { TaskProps } from "../../../6entities/interfaces";
import dayjs from "dayjs";
import { dateFormatter } from "../../../7shared/utils/dateFormatter";

export const TasksPage = () => {
  const dispatch = useAppDispatch();

  const { activeTasks, doneTasks, isLoading } = useAppSelector(
    (state) => state.tasks
  );

  const { categoryid } = useParams();

  useEffect(() => {
    dispatch(getTasksThunk({ categoryid: categoryid }));
  }, [categoryid]);

  const deadlineTasks: TaskProps[] = useMemo(() => {
    if (activeTasks.length > 3) {
      return [...activeTasks].sort(
        (a, b) => dayjs(a.deadLine).unix() - dayjs(b.deadLine).unix()
      );
    }
    return activeTasks;
  }, [activeTasks, categoryid]);

  return (
    <div className={styles.tasks_page}>
      <div className={`${styles.side} ${styles.left}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <div className={styles.block}>
              <div className={styles.block_container}>
                <p className={styles.title}>Активные задачи</p>
                <div className={styles.tasks_container}>
                  {activeTasks.length ? (
                    <ul>
                      {activeTasks.map((item) => (
                        <Task task={item} key={item.id} />
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.error}>У вас нет ни одной задачи</p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.block_container}>
                <p className={styles.title}>Завершённые задачи</p>
                <div className={styles.tasks_container}>
                  {doneTasks.length ? (
                    <ul>
                      {doneTasks.map((item) => (
                        <Task task={item} key={item.id} />
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.error}>
                      У вас нет ни одной завершённой задачи
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.side} ${styles.right}`}>
        <div className={styles.container}>
          <div className={styles.block}>
            <div className={styles.block_container}>
              <p className={styles.title}>Недавние задачи</p>
              <div className={styles.tasks_container}>
                <ul>
                  {[...activeTasks, ...doneTasks].map((item) => {
                    const currentDate = dayjs().toString();

                    if (
                      parseInt(
                        `${dayjs(currentDate).year()}${dateFormatter(
                          dayjs(currentDate).month()
                        )}${dateFormatter(dayjs(currentDate).day())}`
                      ) -
                        parseInt(
                          `${dayjs(item.creationDate).year()}${dateFormatter(
                            dayjs(item.creationDate).month()
                          )}${dateFormatter(dayjs(item.creationDate).day())}`
                        ) <=
                      7
                    ) {
                      return <Task task={item} />;
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.block_container}>
              <p className={styles.title}>Дедлайны</p>
              <div className={styles.tasks_container}>
                <ul>
                  {deadlineTasks.map((item) => {
                    const currentDate = dayjs().toString();

                    if (
                      parseInt(
                        `${dayjs(item.deadLine).year()}${dateFormatter(
                          dayjs(item.deadLine).month()
                        )}${dateFormatter(dayjs(item.deadLine).day())}`
                      ) -
                        parseInt(
                          `${dayjs(currentDate).year()}${dateFormatter(
                            dayjs(currentDate).month()
                          )}${dateFormatter(dayjs(currentDate).day())}`
                        ) <=
                      7
                    ) {
                      return <Task task={item} />;
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
