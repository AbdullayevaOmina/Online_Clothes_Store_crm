import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { users } from "@service";
import Notification from "@notification";
import { FormData } from "@users-interface";
import { style } from "@ui";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = {
      first_name: (e.target as any).first_name.value.trim(),
      last_name: (e.target as any).last_name.value.trim(),
      age: parseInt((e.target as any).age.value.trim()),
      gender: (e.target as any).gender.value.trim(),
      email: (e.target as any).email.value.trim(),
      password: (e.target as any).password.value,
      phone_number: (e.target as any).phone_number.value,
    };
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await users.create_user(formData);
      if (response.status === 201) {
        setOpen(false);
        Notification({ title: "Worker added successfully", type: "success" });
        window.location.reload();
      } else {
        throw new Error("Failed to add worker");
      }
    } catch (error) {
      console.error("Error adding worker:", error);
      Notification({ title: "Failed to add worker", type: "error" });
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Add User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
          >
            Add User
          </Typography>
          <form onSubmit={handleSubmit} className="w-full mt-4 grid gap-4">
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              name="first_name"
              autoFocus
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              name="last_name"
            />

            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Age"
              name="age"
            />

            <TextField
              fullWidth
              variant="outlined"
              type="tel"
              label="Phone Number"
              name="phone_number"
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Gender"
              name="gender"
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              name="password"
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
