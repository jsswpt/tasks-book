import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactChild;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ background: "#222831", height: "100vh" }}>
      <Box
        component="main"
        sx={{ height: "95vh", display: "flex", alignItems: "center" }}
      >
        <Container
          disableGutters
          maxWidth={false}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {children}
        </Container>
      </Box>
      <Box
        component="footer"
        sx={{ height: "5vh", display: "flex", alignItems: "center" }}
      >
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: "Montserrat",
              }}
            >
              © DOLYA.INC
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
