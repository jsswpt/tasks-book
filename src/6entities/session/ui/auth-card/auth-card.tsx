import { Card, Box, Typography, Divider } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const boxStyles = {
  ":not(:last-child)": {
    marginBottom: "20px",
  },
};

interface AuthCardProps {
  title: string;
  children: React.ReactNode | React.ReactChild;
  question: string;
  answer: string;
  path: string;
}

export const AuthCard: FC<AuthCardProps> = ({
  answer,
  children,
  path,
  question,
  title,
}) => {
  return (
    <Card
      elevation={4}
      sx={{
        padding: "20px",
        minWidth: "350px",
        background: "#2C3440",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Box sx={boxStyles}>
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "25px",
              color: "#3F88C5",
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ ...boxStyles }}>{children}</Box>
        <Divider sx={boxStyles}>
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontWeight: 500,
              fontSize: "16px",
              color: "#F9F9F9",
              textAlign: "center",
            }}
          >
            или
          </Typography>
        </Divider>
        <Box sx={boxStyles}>
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontWeight: 400,
              fontSize: "14px",
              color: "#F9F9F9",
              textAlign: "center",
            }}
          >
            {question}?{" "}
            <Link
              to={`/${path}`}
              style={{ color: "#3F88C5", textDecoration: "underline" }}
            >
              {answer}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
