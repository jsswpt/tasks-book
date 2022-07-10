import { SigninPage, SignupPage } from "../";
import { AppPage } from "../app-page/app-page";

export const publicRoutes = [
  { path: "/signin", element: <SigninPage /> },
  { path: "/signup", element: <SignupPage /> },
];

export const privateRoutes = [{ path: "/", element: <AppPage /> }];
