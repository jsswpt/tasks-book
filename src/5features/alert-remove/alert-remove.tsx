import React from "react";
import { useAppDispatch } from "../../1app/store";

interface AlertRemoveProps {
  children: React.ReactNode | React.ReactChild;
  id: string;
  onClick: any;
}

export const AlertRemove: React.FC<AlertRemoveProps> = ({
  children,
  id,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </div>
  );
};
