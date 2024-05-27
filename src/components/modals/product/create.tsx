import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useCategoryStore, useProductStore } from "@store";
import { validationSchemaProductCreate } from "@validation";
import { style } from "@ui";
style.width = 650;

export default function BasicModal() {
  const { createData } = useProductStore();
  const { data, getData } = useCategoryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    age_max: "",
    age_min: "",
    category_id: "",
    color: "",
    cost: "",
    count: "",
    discount: "",
    for_gender: "",
    made_in: "",
    product_name: "",
    size: "",
    description: "",
  };

  useEffect(() => {
    getData({ page: 1, limit: 100 });
  }, []);

  const handleSubmit = async (values: any) => {
    console.log(values);
    const status = await createData(values);
    if (status === 201) {
      handleClose();
    } else {
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Create product
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
            validationSchema={validationSchemaProductCreate}
            onSubmit={handleSubmit}
          >
            <Form className="max-w-[700px] w-full flex flex-col gap-[12px]">
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h1"
                className="text-center"
              >
                Create product
              </Typography>
              <div className="flex gap-3 w-full">
                <div className="flex flex-col gap-3">
                  <Field
                    as={TextField}
                    label="Age maximum"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="age_max"
                    className="w-[100%] mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="age_max"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as={TextField}
                    label="Age minimum"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="age_min"
                    className="w-[100%] mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="age_min"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as="select"
                    name="category_id"
                    className="w-full border py-5 rounded-md px-1"
                  >
                    {data.map((item) => (
                      <option key={item?.category_id} value={item?.category_id}>
                        {item?.category_name}
                      </option>
                    ))}
                  </Field>
                  <Field
                    as={TextField}
                    label="Color"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="color"
                    className="w-[100%] mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="color"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as={TextField}
                    label="Cost"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="cost"
                    className="w-[100%] mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="cost"
                    component="small"
                    className="text-rose-600"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Field
                    as={TextField}
                    label="Count"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="count"
                    className="w-[100%] mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="count"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as={TextField}
                    label="Discount"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="discount"
                    className="w-[100%] mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="discount"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as="select"
                    name="made_in"
                    className="w-full border py-5 rounded-md px-1"
                  >
                    {["Uzbekistan", "China", "Turkey"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Field>
                  <Field
                    as={RadioGroup}
                    aria-label="For gender"
                    name="for_gender"
                    className="flex items-center py-[10px]"
                  >
                    <div className="flex items-center justify-between">
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
                    name="for_gender"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as={TextField}
                    label="Size"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="size"
                    className="w-[100%] mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="size"
                    component="small"
                    className="text-rose-600"
                  />
                </div>
              </div>
              <Field
                as={TextField}
                label="Product name"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="product_name"
                className="w-[100%] mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="product_name"
                component="small"
                className="text-rose-600"
              />
              <Field
                as={TextField}
                label="Description"
                sx={{
                  "& textarea": {
                    color: "#00000",
                    fontSize: "20px",
                  },
                }}
                type="text"
                name="description"
                multiline
                rows={4}
                className="w-[100%] mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="description"
                component="small"
                className="text-rose-600"
              />
              <Button variant="contained" type="submit" className="w-full py-3">
                Create
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
