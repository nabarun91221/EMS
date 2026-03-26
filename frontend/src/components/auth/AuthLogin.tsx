"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import CustomTextField from "./CustomTextField";
import useUserStore from "@/store/useUserStore";
import useAlertStore from "@/store/useAlertStore";
import { useRouter } from "next/navigation";
interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {

  const { setUser } = useUserStore()
  const { setAlert } = useAlertStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
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
      const res = await fetch("http://localhost:7777/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role === "ATTENDEE") {
          setUser(data.user)
          setAlert({
            status: true,
            message: data.message,
            severity: "success",
          });
          router.push("/attendee/dashboard")
        } else if (data.user.role === "ORGANIZER") {
          setUser(data.user)
          setAlert({
            status: true,
            message: data.message,
            severity: "success",
          });
          router.push("/organizer/dashboard")
        } else {
          setAlert({
            status: true,
            message: "invalid credential (required admin/superadmin credential but got user's) ",
            severity: "error",
          });
        }
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

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
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
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>

          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
      </Box>

      {subtitle}
    </form>
  );
};

export default AuthLogin;
