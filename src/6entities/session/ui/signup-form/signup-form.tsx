import { Box, Button, OutlinedInput } from "@mui/material";
import { FC, useState } from "react";

const inputProps = {
  fontFamily: "Nunito",
  fontWeight: "400",
  fontsize: "14px",
  lineheight: "19px",
  color: "white",
  marginBottom: "20px",
};

interface SignInFormProps {
  onSubmit: any;
}

export const SignupForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <Box
      component="form"
      onSubmit={(evt: any) => {
        evt.preventDefault();
        onSubmit({ email, login, password, passwordConfirm });
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <OutlinedInput
          value={login}
          onChange={(evt: any) => setLogin(evt.target.value)}
          size="small"
          sx={inputProps}
          fullWidth
          placeholder="Login"
        />

        <OutlinedInput
          value={email}
          onChange={(evt: any) => setEmail(evt.target.value)}
          type="email"
          size="small"
          sx={inputProps}
          fullWidth
          placeholder="Email"
          autoFocus
        />

        <OutlinedInput
          value={password}
          onChange={(evt: any) => setPassword(evt.target.value)}
          size="small"
          type="password"
          sx={inputProps}
          fullWidth
          placeholder="Password"
        />
        <OutlinedInput
          value={passwordConfirm}
          onChange={(evt: any) => setPasswordConfirm(evt.target.value)}
          size="small"
          type="password"
          sx={inputProps}
          fullWidth
          placeholder="Password confirm"
        />
        <Button
          type="submit"
          disableElevation
          variant="contained"
          sx={{
            fontFamily: "Nunito",
            width: "fit-content",
            height: "42px",
            background: "#3F88C5",
            borderRadius: "8px",
            fontweight: 600,
            fontsize: "16px",
            color: " #FAFAFA",
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
};
