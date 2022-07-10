import { FC, useState } from "react";
import styles from "./checkbox.module.css";

import { MdDone } from "react-icons/md";

interface CheckBoxProps {
  value: boolean;
  onClick?: any;
}

export const MyCheckBox: FC<CheckBoxProps> = ({ value, onClick }) => {
  const [isChecked, setIsChecked] = useState(value);
  return (
    <div
      className={styles.checkbox}
      onClick={() => {
        setIsChecked(!isChecked);
        onClick();
      }}
    >
      {isChecked && <MdDone className={styles.check} />}
    </div>
  );
};
