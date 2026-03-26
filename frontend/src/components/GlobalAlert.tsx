"use client";

import { Snackbar, Alert as MuiAlert } from "@mui/material";
import useAlertStore from "@/store/useAlertStore";

const GlobalAlert = () => {
  const { alert, clearAlert } = useAlertStore();

  return (
    <Snackbar
      open={!!alert?.status}
      autoHideDuration={3000}
      onClose={clearAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        severity={alert?.severity}
        variant="filled"
        onClose={clearAlert}
      >
        {alert?.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default GlobalAlert;