import { useEffect } from "react";
import { Signup } from "../../5features/signup/signup";
import { AuthLayout } from "../../7shared/layouts/auth-layout";

export const SignupPage = () => {
  useEffect(() => {
    document.title = "Sign up";
  }, []);

  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
};
