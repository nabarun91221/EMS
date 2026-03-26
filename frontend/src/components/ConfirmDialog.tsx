"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onClose,
  onConfirm,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}