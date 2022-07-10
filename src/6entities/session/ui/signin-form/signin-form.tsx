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

export const SigninForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      component="form"
      onSubmit={(evt: any) => {
        evt.preventDefault();
        onSubmit(email, password);
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
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
        <Button
          type="submit"
          disableElevation
          variant="contained"
          sx={{
            fontFamily: "Nunito",
            width: "98px",
            height: "fit-content",
            background: "#3F88C5",
            borderRadius: "8px",
            fontweight: 600,
            fontsize: "16px",
            color: " #FAFAFA",
          }}
        >
          Вход
        </Button>
      </Box>
    </Box>
  );
};
