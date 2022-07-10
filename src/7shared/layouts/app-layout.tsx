import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode | React.ReactChild;
}

export const AppLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ background: "#222831", overflow: "hidden" }}>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        {children}
      </Container>
    </Box>
  );
};
