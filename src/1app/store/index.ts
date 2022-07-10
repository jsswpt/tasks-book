import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import sessionReducer from "../../6entities/session/model";
import categoriesReducer from "../../6entities/categories/model";
import tasksReducer from "../../6entities/tasks/model";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    categories: categoriesReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
