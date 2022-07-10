import { useAppDispatch } from "../../1app/store";
import { signinThunk } from "../../6entities/session/model";
import { AuthCard } from "../../6entities/session/ui/auth-card/auth-card";
import { SigninForm } from "../../6entities/session/ui/signin-form/signin-form";

export const Signin = () => {
  const dispatch = useAppDispatch();
  const signin = (email: string, password: string) => {
    dispatch(signinThunk({ email: email, password: password }));
  };

  return (
    <AuthCard
      answer="Регистрация"
      path="signup"
      question="Ещё нет аккаунта"
      title="Вход в аккаунт"
    >
      <SigninForm onSubmit={signin} />
    </AuthCard>
  );
};
