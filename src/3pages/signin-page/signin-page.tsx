import { useEffect } from "react";
import { Signin } from "../../5features/signin/signin";
import { AuthLayout } from "../../7shared/layouts/auth-layout";

export const SigninPage = () => {
  useEffect(() => {
    document.title = "Sign in";
  }, []);

  return (
    <AuthLayout>
      <Signin />
    </AuthLayout>
  );
};
