import { Button, Card, Grid } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import {
  MdAlarm,
  MdAnchor,
  MdAndroid,
  MdCardTravel,
  MdOutlineAccountBox,
  MdOutlineDelete,
  MdOutlineDevices,
  MdOutlineDirectionsRun,
  MdOutlineDirectionsSubway,
  MdOutlineDriveEta,
  MdOutlineExplore,
  MdOutlineFace,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { getRandomId } from "../../utils/getRandomId";

import styles from "./picker.module.css";

export interface IconProps {
  icon: any;
  iconName: string;
  id: string;
}

export const availableIcons: IconProps[] = [
  {
    icon: <MdAlarm className={styles.icon} />,
    iconName: "ALARM",
    id: getRandomId(),
  },
  {
    icon: <MdAnchor className={styles.icon} />,
    iconName: "ANCHOR",
    id: getRandomId(),
  },
  {
    icon: <MdAndroid className={styles.icon} />,
    iconName: "ANDROID",
    id: getRandomId(),
  },
  {
    icon: <MdCardTravel className={styles.icon} />,
    iconName: "TRAVEL",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineDelete className={styles.icon} />,
    iconName: "DELETE",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineDevices className={styles.icon} />,
    iconName: "DEVICES",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineDirectionsRun className={styles.icon} />,
    iconName: "RUN",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineDirectionsSubway className={styles.icon} />,
    iconName: "SUBWAY",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineDriveEta className={styles.icon} />,
    iconName: "ETA",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineAccountBox className={styles.icon} />,
    iconName: "ACCOUNT",
    id: getRandomId(),
  },
  {
    icon: <HiOutlineHome className={styles.icon} />,
    iconName: "HOME",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineFace className={styles.icon} />,
    iconName: "FACE",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineFavoriteBorder className={styles.icon} />,
    iconName: "FAVORITE",
    id: getRandomId(),
  },
  {
    icon: <MdOutlineExplore className={styles.icon} />,
    iconName: "EXPLORE",
    id: getRandomId(),
  },
];

interface PickerProps {
  onClick: any;
  iconName?: string;
}

export const IconPicker: FC<PickerProps> = ({ onClick, iconName }) => {
  const [activeIcon, setActiveIcon] = useState("");

  useEffect(() => {
    if (iconName) {
      setActiveIcon(iconName);
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {availableIcons.map((icon) => (
            <Grid item xs={1} md={2}>
              <div className={styles.item}>
                <button
                  type="button"
                  className={
                    activeIcon === icon.id || activeIcon === icon.iconName
                      ? `${styles.icon_button} ${styles.icon_button_active}`
                      : styles.icon_button
                  }
                  onClick={() => {
                    setActiveIcon(icon.id);
                    onClick(icon);
                  }}
                >
                  <div className={styles.icon_container}>{icon.icon}</div>
                </button>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
