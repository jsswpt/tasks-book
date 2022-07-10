import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../1app/store";
import { HomePage } from "../app-page/home-page/home-page";
import { TasksPage } from "../app-page/tasks-page/tasks-page";
import { privateRoutes, publicRoutes } from "./routes";

export const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.session);
  const { categories } = useAppSelector((state) => state.categories);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((item) => (
        <Route path={item.path} element={item.element} key={item.path}>
          <Route path="tasks/:categoryid" element={<TasksPage />} />
        </Route>
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((item) => (
        <Route path={item.path} element={item.element} key={item.path} />
      ))}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
};
