import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../1app/store";
import { SerializedActionAlert } from "../../6entities/interfaces";
import { Alerter } from "../alerter/alerter";
import styles from "./list.module.css";

export const AlertsList = () => {
  const dispatch = useAppDispatch();

  const [alerts, setAlerts] = useState<SerializedActionAlert[]>([]);

  const tasks = useAppSelector((state) => state.tasks);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    setAlerts([tasks.alerts, categories.alerts].flat());
  }, [tasks.alerts, categories.alerts]);

  return (
    <ul className={styles.alert_list}>
      {alerts.map((item) => (
        <li key={item.id}>
          <Alerter alert={item} />
        </li>
      ))}
    </ul>
  );
};
