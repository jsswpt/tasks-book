import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../1app/store";
import { AlertsList } from "../../4widgets/alerts-list/alerts-list";
import { Header } from "../../4widgets/header/header";
import { Menu } from "../../4widgets/menu/menu";
import { getCategoriesThunk } from "../../6entities/categories/model";
import { AppLayout } from "../../7shared/layouts/app-layout";

import styles from "./app.module.css";
import { HomePage } from "./home-page/home-page";
import { TasksPage } from "./tasks-page/tasks-page";

export const AppPage = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session);
  const categories = useAppSelector((state) => state.categories);
  const tasks = useAppSelector((state) => state.tasks);

  useEffect(() => {
    document.title = "Tasks Book";
    dispatch(getCategoriesThunk({ userid: session.user.id }));
  }, []);

  return (
    <AppLayout>
      <Menu />
      <div className={styles.app}>
        <div className={styles.app_container}>
          <div className={styles.header_el}>
            <Header />
          </div>
          <main className={styles.main}>
            <div className={styles.main_container}>
              <Routes>
                <Route path="/tasks/:taskid" element={<TasksPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
      {tasks.alerts.length || categories.alerts.length ? (
        <div className={styles.alert_list_container}>
          <AlertsList />
        </div>
      ) : (
        <></>
      )}
    </AppLayout>
  );
};
