import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { MdAutoAwesome, MdClose, MdOutlineErrorOutline } from "react-icons/md";
import { useAppDispatch } from "../../1app/store";
import { AlertRemove } from "../../5features/alert-remove/alert-remove";
import { removeCategoriesAlert } from "../../6entities/categories/model";
import { AlertTypes, SerializedActionAlert } from "../../6entities/interfaces";
import { removeTasksAlert } from "../../6entities/tasks/model";

import styles from "./alerter.module.css";

interface AlerterProps {
  alert: SerializedActionAlert;
}

export const Alerter: FC<AlerterProps> = ({ alert }) => {
  const [isDeleted, setIsDeleted] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsDeleted(false);
    }, 100);
  }, []);
  return (
    <Card
      sx={{
        padding: "10px",
        width: "100%",
        position: "relative",
        opacity: isDeleted ? 0 : 1,
        transition: "0.4s",
      }}
    >
      <Box sx={{ position: "absolute", right: "5px", top: "5px" }}>
        <AlertRemove
          id={alert.id}
          onClick={() => {
            setIsDeleted(true);
            setTimeout(() => {
              if (alert.reducer === "tasks") {
                dispatch(removeTasksAlert(alert.id));
              } else if (alert.reducer === "categories") {
                dispatch(removeCategoriesAlert(alert.id));
              }
            }, 500);
          }}
        >
          <Box sx={{ width: "18px", height: "18px" }}>
            <MdClose className={`${styles.icon} ${styles.close}`} />
          </Box>
        </AlertRemove>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px",
          }}
        >
          <Box sx={{ width: "22px", height: "22px" }}>
            {alert.type === AlertTypes.error ? (
              <MdOutlineErrorOutline
                className={`${styles.icon} ${styles.error}`}
              />
            ) : (
              <MdAutoAwesome className={`${styles.icon} ${styles.success}`} />
            )}
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography
              sx={{
                fontfamily: "Nunito",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "0.02em",
                color: alert.type === AlertTypes.error ? "#F05454" : "#3F88C5",
              }}
            >
              {alert.action}
            </Typography>
            <Typography
              sx={{
                fontfamily: "Montserrat",
                fontWeight: 400,
                fontSize: "14px",
                color: "black",
              }}
            >
              {alert.message}:{" "}
              <span className={styles.reason}>{alert.reason}</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
