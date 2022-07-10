import { Avatar, Button } from "@mui/material";
import { useAppSelector } from "../../1app/store";

import { MdOutlineAddCircleOutline } from "react-icons/md";

import styles from "./header.module.css";
import { TaskAdd } from "../../5features/task-add/task-add";

export const Header = () => {
  const { user } = useAppSelector((state) => state.session);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.block_add}>
          <TaskAdd />
        </div>
        <div className={styles.block_user}>
          <p className={styles.welcome}>Доброго дня, {user.login}</p>
          <Avatar
            sx={{
              width: "44px",
              height: "44px",
              border: "1px solid #F0F0F0",
              background: "#222831",
            }}
          />
        </div>
      </div>
    </div>
  );
};
