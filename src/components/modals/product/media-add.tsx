import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { getDataFromCookie } from "@token-service";
import { style } from "@ui";

export default function BasicModal({ dataId }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const postMedia = async (data: any) => {
    try {
      const token = getDataFromCookie("access_token");
      const url = `http://store.go-clothes.uz:5555/v1/media/upload-photo?id=${data.id}`;
      const formData = new FormData();
      formData.append("file", data.upload_photo);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Media uploaded successfully");
        handleClose();
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error : " + error?.message);
    }
  };

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const data = {
      upload_photo: file,
      id: dataId,
    };
    postMedia(data);
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-sky-500">
        <PhotoCameraIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" flex flex-col gap-3 items-center">
            <input
              className="border py-3 w-full px-2 rounded-md"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
