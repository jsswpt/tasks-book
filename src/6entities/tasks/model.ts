import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch } from "react";
import {
  addTask,
  changeTask,
  getTasks,
  removeTask,
  toggleTaskState,
} from "../../7shared/api/tasks";
import { checker } from "../helpers";
import {
  Alert,
  AlertTypes,
  SerializedActionAlert,
  TaskProps,
  TasksSliceProps,
} from "../interfaces";

const initialState: TasksSliceProps = {
  alerts: [],
  isLoading: false,
  isSuccess: false,
  tasks: [],
  activeTasks: [],
  doneTasks: [],
};

export const getTasksThunk = createAsyncThunk(
  "tasks/getTasksThunk",
  async ({ categoryid }: any, { rejectWithValue }) => {
    try {
      const tasks = await getTasks(categoryid);
      return tasks;
    } catch (error: any) {
      return rejectWithValue(
        new Alert({
          reducer: "tasks",
          action: "Загрузка заметок",
          message: "Не удалось загрузить заметки",
          reason: error.message,
          type: AlertTypes.error,
        })
      );
    }
  }
);

export interface AddProps {
  task: {
    title: string;
    deadLine: Dayjs | null;
    categoryid: string;
    priority: number;
    userid: string;
  };
}

export const addTaskThunk = createAsyncThunk(
  "tasks/addTaskThunk",
  async ({ task }: AddProps, { rejectWithValue, dispatch }) => {
    if (checker(task.title)) {
      try {
        const newTask = await addTask({ task });
        return newTask;
      } catch (error: any) {
        return rejectWithValue(
          new Alert({
            reducer: "tasks",
            action: "Добавить заметку",
            message: "Не удалось добавить заметку",
            reason: error.message,
            type: AlertTypes.error,
          })
        );
      }
    } else {
      return rejectWithValue(
        new Alert({
          reducer: "tasks",
          action: "Добавить заметку",
          message: "Не удалось добавить заметку",
          reason: "Недостаточная длина заметки",
          type: AlertTypes.error,
        })
      );
    }
  }
);

interface ToggleIsDoneProps {
  task: TaskProps;
}

export const toggleTaskStateThunk = createAsyncThunk(
  "tasks/toggleTaskStateThunk",
  async ({ task }: ToggleIsDoneProps, { rejectWithValue, dispatch }) => {
    try {
      const newTask = await toggleTaskState(task);
      dispatch(toggleTaskIsDone({ newTask }));
    } catch (error: any) {
      return rejectWithValue(
        new Alert({
          reducer: "tasks",
          action: "Изменить тип заметки",
          message: "Не удалось изменить тип заметки",
          reason: error.message,
          type: AlertTypes.error,
        })
      );
    }
  }
);

export interface ChangeTaskProps {
  categoryid: string;
  deadLine: Date | null;
  title: string;
  priority: number;
  task: TaskProps;
}

export const changeTaskThunk = createAsyncThunk(
  "tasks/changeTaskThunk",
  async (
    { categoryid, deadLine, title, priority, task }: ChangeTaskProps,
    { rejectWithValue, dispatch }
  ) => {
    if (checker(title)) {
      try {
        const newTask = await changeTask({
          categoryid,
          deadLine,
          priority,
          task,
          title,
        });
        dispatch(replaceTask(newTask));
        return newTask;
      } catch (error: any) {
        return rejectWithValue(1);
      }
    } else {
      return rejectWithValue(
        new Alert({
          reducer: "tasks",
          action: "Изменить заметку",
          message: "Не удалось изменить заметку",
          reason: "Недостаточная длина заметки",
          type: AlertTypes.error,
        })
      );
    }
  }
);

interface RemoveProps {
  taskid?: string;
  categoryId?: string;
  isDone: boolean;
}

export const removeTaskThunk = createAsyncThunk(
  "tasks/removeTaskThunk",
  async (
    { isDone, taskid, categoryId }: RemoveProps,
    { rejectWithValue, dispatch }
  ) => {
    try {
      if (taskid) {
        await removeTask(taskid);
        dispatch(removeTaskFromArray({ isDone, taskid }));
      } else if (categoryId) {
        await removeTask(categoryId);
        dispatch(removeTaskFromArray({ isDone, categoryId }));
      }
    } catch (error: any) {
      return rejectWithValue(
        new Alert({
          reducer: "tasks",
          action: "Удалить заметку",
          message: "Не удалось удалить заметку",
          reason: error.message,
          type: AlertTypes.error,
        })
      );
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskIsDone: (state, action) => {
      const { newTask } = action.payload;
      if (newTask.isDone) {
        state.activeTasks = state.activeTasks.filter(
          (item) => item.id !== newTask.id
        );
        state.doneTasks.unshift(newTask);
      } else if (!newTask.isDone) {
        state.doneTasks = state.doneTasks.filter(
          (item) => item.id !== newTask.id
        );
        state.activeTasks.unshift(newTask);
      }
    },

    replaceTask: (state, action) => {
      const newTask = action.payload;

      if (!newTask.isDone) {
        state.activeTasks = state.activeTasks.map((item) => {
          if (item.id === newTask.id) {
            return newTask;
          } else {
            return item;
          }
        });
      } else if (newTask.isDone) {
        state.doneTasks = state.doneTasks.map((item) => {
          if (item.id === newTask.id) {
            return newTask;
          } else {
            return item;
          }
        });
      }
    },

    removeTaskFromArray: (state, action) => {
      if (action.payload.isDone) {
        state.doneTasks = state.doneTasks.filter(
          (item) => item.id !== action.payload.taskid
        );
      } else if (!action.payload.isDone) {
        state.activeTasks = state.activeTasks.filter(
          (item) => item.id !== action.payload.taskid
        );
      }
    },

    removeTasksAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTasksThunk.fulfilled, (state, action) => {
      const tasks = action.payload as TaskProps[];

      const doneTasks = tasks.filter((item) => item.isDone === true);
      const activeTasks = tasks.filter((item) => item.isDone === false);
      state.activeTasks = activeTasks;
      state.doneTasks = doneTasks;
      state.isLoading = false;
    });
    builder.addCase(getTasksThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // ---------------------

    builder.addCase(addTaskThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTaskThunk.fulfilled, (state, action) => {
      state.activeTasks.unshift(action.payload as TaskProps);
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(addTaskThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // ---------------------

    builder.addCase(toggleTaskStateThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(toggleTaskStateThunk.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(toggleTaskStateThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // ---------------------

    builder.addCase(changeTaskThunk.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(changeTaskThunk.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
    });

    builder.addCase(changeTaskThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);

      state.isLoading = false;
    });

    // ---------------------

    builder.addCase(removeTaskThunk.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(removeTaskThunk.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
    });

    builder.addCase(removeTaskThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // ---------------------
  },
});

export const {
  toggleTaskIsDone,
  replaceTask,
  removeTaskFromArray,
  removeTasksAlert,
} = tasksSlice.actions;
export default tasksSlice.reducer;
