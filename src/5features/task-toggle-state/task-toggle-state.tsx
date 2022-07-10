import React, { FC, useState } from "react";
import { useAppDispatch } from "../../1app/store";
import { TaskProps } from "../../6entities/interfaces";
import { toggleTaskStateThunk } from "../../6entities/tasks/model";
import { MyCheckBox } from "../../7shared/ui/checkbox/MyCheckBox";

interface ToggleStateProps {
  task: TaskProps;
}

export const TaskToggleState: FC<ToggleStateProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const toggleState = () => {
    dispatch(toggleTaskStateThunk({ task: task }));
  };

  return <MyCheckBox value={task.isDone} onClick={toggleState} />;
};
