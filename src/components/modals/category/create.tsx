import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { categories } from "@service";
import Notification from "@notification";
import { FormData } from "@categories-interface";
import { style } from "@ui";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = {
      category_name: (e.target as any).category_name.value.trim(),
    };

    try {
      const response = await categories.create_category(formData);
      if (response.status === 201) {
        setOpen(false);
        Notification({ title: "category added successfully", type: "success" });
        window.location.reload();
      } else {
        throw new Error("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Notification({ title: "Failed to add category", type: "error" });
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Category
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
            Create Category
          </Typography>
          <form onSubmit={handleSubmit} className="w-full mt-4 grid gap-4">
            <TextField
              fullWidth
              variant="outlined"
              label="Ctegory Name"
              name="category_name"
              autoFocus
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
