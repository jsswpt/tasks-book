import { useAppDispatch } from "../../1app/store";
import { SignupProps, signupThunk } from "../../6entities/session/model";
import { AuthCard } from "../../6entities/session/ui/auth-card/auth-card";
import { SignupForm } from "../../6entities/session/ui/signup-form/signup-form";

export const Signup = () => {
  const dispatch = useAppDispatch();

  const signup = ({ email, login, password, passwordConfirm }: SignupProps) => {
    dispatch(
      signupThunk({
        email: email,
        login: login,
        password: password,
        passwordConfirm: passwordConfirm,
      })
    );
  };
  return (
    <AuthCard
      answer="Войти"
      path="signin"
      question="Уже есть аккаунт"
      title="Регистрация"
    >
      <SignupForm onSubmit={signup} />
    </AuthCard>
  );
};
