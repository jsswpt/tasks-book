import dayjs from "dayjs";
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { TaskProps } from "../../6entities/interfaces";
import { AddProps, ChangeTaskProps } from "../../6entities/tasks/model";
import { firestore } from "../firebase/config";
import { getRandomId } from "../utils/getRandomId";

export const getTasks = async (categoryid: string) => {
  const tasksQuery = query(
    collection(firestore, "tasks"),
    where("categoryid", "==", categoryid)
  );
  const tasksDocs = await getDocs(tasksQuery);
  const tasks = tasksDocs.docs.map((item) => item.data());
  return tasks;
};

export const addTask = async ({ task }: AddProps) => {
  const newTask: TaskProps = {
    categoryid: task.categoryid,
    creationDate: dayjs().toString(),
    deadLine: dayjs(task.deadLine).toString(),
    id: getRandomId(),
    isDone: false,
    priority: task.priority,
    title: task.title,
    userid: task.userid,
  };

  await setDoc(doc(firestore, "tasks", newTask.id.toString()), newTask);
  return newTask;
};

export const toggleTaskState = async (task: TaskProps) => {
  await setDoc(doc(firestore, "tasks", task.id), {
    ...task,
    isDone: !task.isDone,
  });

  return { ...task, isDone: !task.isDone };
};

export const changeTask = async ({
  categoryid,
  deadLine,
  priority,
  task,
  title,
}: ChangeTaskProps) => {
  await setDoc(doc(firestore, "tasks", task.id), {
    ...task,
    categoryid: categoryid,
    deadLine: dayjs(deadLine).unix(),
    title: title,
    priority: priority,
  });

  return {
    ...task,
    categoryid: categoryid,
    deadLine: dayjs(deadLine).unix(),
    title: title,
    priority: priority,
  };
};

export const removeTask = async (taskid: string) => {
  await deleteDoc(doc(firestore, "tasks", taskid));
};
