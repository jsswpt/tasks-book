import {
  Button,
  Card,
  Input,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../1app/store";
import styles from "./addform.module.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TaskProps } from "../../../interfaces";
import { CategoryAdd } from "../../../../5features/category-add/category-add";

interface FormProps {
  close: () => void;
  onSubmit: any;
  task?: TaskProps;
  actionTitle?: string;
  buttonInner?: string;
}

export const TaskForm: FC<FormProps> = ({
  close,
  onSubmit,
  task,
  buttonInner,
  actionTitle,
}) => {
  const { categories } = useAppSelector((state) => state.categories);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(5);
  const [deadLine, setDeadLine] = useState<Date | null>(new Date());
  const [categoryid, setCategoryid] = useState("");

  const handleDeadLine = (newValue: Date | null) => {
    setDeadLine(newValue);
  };

  const handlePriority = (event: Event, newValue: number | number[]) => {
    setPriority(newValue as number);
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setDeadLine(new Date());
      setCategoryid(task.categoryid);
    }
    if (categories.length) {
      setCategoryid(categories[0].id);
    } else {
      return;
    }
  }, []);

  return (
    <Card
      sx={{
        padding: "20px",
        width: "50%",
        background: "#FFFFFF",
        boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
        borderRadius: "10px",
      }}
    >
      <div className={styles.container}>
        <div className={styles.block}>
          <p className={styles.title}>
            {actionTitle ? actionTitle : "Добавить новую задачу"}
          </p>
        </div>
        <form
          className={styles.form}
          onSubmit={(evt: any) => {
            evt.preventDefault();
            onSubmit(categoryid, deadLine, title, priority);
            close();
          }}
        >
          <div className={styles.block}>
            <p className={styles.ask}>Что нужно сделать?</p>
            <Input
              value={title}
              onChange={(evt) => setTitle(evt.currentTarget.value)}
              fullWidth
              placeholder="Введите задачу"
              sx={{
                fontFamily: "Nunito",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "19px",
                letterspacing: "0.02em",
                color: "#000000",
              }}
            />
          </div>
          <div className={styles.block_options}>
            <div className={styles.option}>
              <p className={styles.ask}>Категория</p>
              {categories.length ? (
                <Select
                  fullWidth
                  value={categoryid}
                  size="small"
                  onChange={(evt: any) => setCategoryid(evt.target.value)}
                >
                  {categories.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      <p className={styles.menuitem}>{item.title}</p>
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <CategoryAdd />
              )}
            </div>
            <div className={styles.option}>
              <p className={styles.ask}>Дедлайн</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={deadLine}
                  onChange={handleDeadLine}
                  renderInput={(params) => (
                    <TextField {...params} size="small" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.option}>
              <p className={styles.ask}>Приоритет</p>
              <Slider
                value={priority}
                onChange={handlePriority}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={10}
                sx={{ color: "#3F88C5" }}
              />
            </div>
          </div>
          <div className={styles.block_options}>
            <Button
              variant="contained"
              color="warning"
              onClick={close}
              sx={{
                width: "126px",
                height: "42px",
                background: "#F05454",
                borderRadius: "8px",
                fontFamily: "Nunito",
              }}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: " 126px",
                height: "42px",
                background: "#3F88C5",
                borderRadius: "8px",
                fontFamily: "Nunito",
              }}
            >
              {buttonInner ? buttonInner : "Добавить"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
