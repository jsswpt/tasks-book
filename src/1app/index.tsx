import { AppRouter } from "../3pages/routing/app-router";
import "./index.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./store";
import { getUserThunk } from "../6entities/session/model";
import { useEffect, useState } from "react";
import { Loader } from "../7shared/ui/Loader";
import dayjs from "dayjs";

export const App = () => {
  const [isChecked, setIsChecked] = useState(false);

  const auth = getAuth();

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.session);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUserThunk({ userid: user.uid }));
        setIsChecked(true);
      } else {
        setIsChecked(true);
      }
    });
  }, []);

  if (!isChecked) {
    return <></>;
  } else {
    return isLoading ? <Loader /> : <AppRouter />;
  }
};
