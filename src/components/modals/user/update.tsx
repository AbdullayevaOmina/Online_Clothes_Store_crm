import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { users } from "@service";
import Notification from "@notification";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { UserData } from "@users-interface";
import { style } from "@ui";

const UpdateUser: React.FC<{ UserData: UserData }> = ({ UserData }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<UserData>(UserData);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === "age" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await users.update_user(formData);
      if (response.status === 200) {
        setOpen(false);
        Notification({ title: "Worker updated successfully", type: "success" });
        window.location.reload();
      } else {
        throw new Error("Failed to update worker");
      }
    } catch (error) {
      console.error("Error updating worker:", error);
      Notification({ title: "Failed to update worker", type: "error" });
    }
  };

  useEffect(() => {
    setFormData(UserData);
  }, [UserData]);

  return (
    <div>
      <button className="bg-amber-600 px-8" onClick={handleOpen}>
        <ModeEditIcon />
      </button>
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
            Update User
          </Typography>
          <form onSubmit={handleSubmit} className="w-full mt-4 grid gap-5">
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Phone"
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateUser;
