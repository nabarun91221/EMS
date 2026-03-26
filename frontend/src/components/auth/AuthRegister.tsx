"use client";

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import useAlertStore from "@/store/useAlertStore";
import CustomTextField from "./CustomTextField";

interface registerType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:7777/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({
          status: true,
          message: data.message,
          severity: "success",
        });
        router.push("/authentication/login");
      } else {
        setAlert({
          status: true,
          message: data.message,
          severity: "warning",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Stack>

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign Up
        </Button>
      </Box>

      {subtitle}
    </form>
  );
};

export default AuthRegister;
