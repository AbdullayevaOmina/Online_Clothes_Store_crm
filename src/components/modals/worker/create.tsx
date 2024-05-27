import * as React from "react";
import { useMask } from "@react-input/mask";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Modal,
  Box,
  Typography,
} from "@mui/material";

import { useWorkerStore } from "@store";
import { PostData } from "@workers-interface";
import { validationSchemaWorkerAdd } from "@validation";
import { style } from "@ui";

export default function BasicModal() {
  const { createData } = useWorkerStore();
  const inputRef = useMask({
    mask: "+998 (93) ___-__-__",
    replacement: { _: /\d/ },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: PostData = {
    age: "",
    email: "",
    first_name: "",
    gender: "",
    last_name: "",
    phone_number: "",
    password: "",
  };

  const handleSubmit = async (values: PostData) => {
    const phone = values.phone_number.replace(/\D/g, "");
    const newFormData = { ...values, phone_number: phone };
    const status = await createData(newFormData);
    if (status === 201) {
      handleClose();
    } else {
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Worker
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaWorkerAdd}
            onSubmit={handleSubmit}
          >
            <Form className="grid gap-4">
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h1"
                className="text-center"
              >
                Add Worker
              </Typography>
              <Field as={TextField} label="First Name" name="first_name" />
              <ErrorMessage
                name="first_name"
                component="small"
                className="text-rose-600"
              />

              <Field as={TextField} label="Last Name" name="last_name" />
              <ErrorMessage
                name="last_name"
                component="small"
                className="text-rose-600"
              />

              <Field as={TextField} label="Age" name="age" type="number" />
              <ErrorMessage
                name="age"
                component="small"
                className="text-rose-600"
              />

              <Field as={TextField} label="Email" name="email" />
              <ErrorMessage
                name="email"
                component="small"
                className="text-rose-600"
              />

              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
              />
              <ErrorMessage
                name="password"
                component="small"
                className="text-rose-600"
              />

              <Field
                as={TextField}
                label="Phone Number"
                type="tel"
                inputRef={inputRef}
                name="phone_number"
              />
              <ErrorMessage
                name="phone_number"
                component="small"
                className="text-rose-600"
              />

              <Field as={RadioGroup} aria-label="gender" name="gender">
                <div className="flex items-center justify-center gap-10">
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </div>
              </Field>
              <ErrorMessage
                name="gender"
                component="small"
                className="text-rose-600"
              />

              <Button variant="contained" type="submit" className="w-full py-3">
                add
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
