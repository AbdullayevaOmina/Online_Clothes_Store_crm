import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useEffect } from "react";

import { useProductStore, useCategoryStore } from "@store";
import { validationSchemaProductCreate } from "@validation";

import { style } from "@ui";
style.width = 650;

export default function BasicModal({ dataEdit }: any) {
  const { updateProduct } = useProductStore();
  const { data, getData } = useCategoryStore();

  const sx = { "& input": { color: "#00000", fontSize: "20px" } };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: any = {
    age_max: dataEdit?.age_max || "",
    age_min: dataEdit?.age_min || "",
    category_id: dataEdit?.category_id || "",
    color: dataEdit?.color || "",
    cost: dataEdit?.cost || "",
    count: dataEdit?.count || "",
    discount: dataEdit?.discount || "",
    for_gender: dataEdit?.for_gender || "",
    made_in: dataEdit?.mede_in || "",
    product_name: dataEdit?.product_name || "",
    size: dataEdit?.size || "",
    description: dataEdit?.description || "",
  };

  useEffect(() => {
    getData({ page: 1, limit: 100 });
  }, []);

  const handleSubmit = async (values: any) => {
    const editaData = { ...dataEdit, ...values };
    const status = await updateProduct(editaData);
    if (status === 201) {
      handleClose();
    } else {
      handleClose();
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-amber-500">
        <EditIcon />
      </button>
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
              <h1 className="text-center mb-2 text-[26px] font-bold">
                product change
              </h1>
              <div className="flex gap-3 w-full">
                <div className="flex flex-col gap-3">
                  <Field
                    as={TextField}
                    label="Age maximum"
                    sx={sx}
                    type="number"
                    name="age_max"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="age_max"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as={TextField}
                    label="age minimum"
                    sx={sx}
                    type="number"
                    name="age_min"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="age_min"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as="select"
                    name="category_id"
                    className="w-full  border py-5 rounded-md px-1 "
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
                    sx={sx}
                    type="text"
                    name="color"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="color"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as={TextField}
                    label="Cost"
                    sx={sx}
                    type="number"
                    name="cost"
                    className=" w-[100%]  mb-3 outline-none py-0"
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
                    sx={sx}
                    type="number"
                    name="count"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="count"
                    component="small"
                    className="text-rose-600"
                  />
                  <Field
                    as={TextField}
                    label="Discount"
                    sx={sx}
                    type="number"
                    name="discount"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="discount"
                    component="small"
                    className="text-rose-600"
                  />

                  <Field
                    as="select"
                    name="made_in"
                    className="w-full border py-5 rounded-md px-1 "
                  >
                    {["Uzbekistan", "China", "Turkiy"].map((item) => (
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
                    sx={sx}
                    type="number"
                    name="size"
                    className=" w-[100%]  mb-3 outline-none py-0"
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
                sx={sx}
                type="text"
                name="product_name"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="product_name"
                component="small"
                className="text-rose-600"
              />
              <Field
                as={TextField}
                label="Discription"
                sx={{
                  "& textarea": {
                    color: "#00000",
                    fontSize: "20px",
                    length: "160px",
                  },
                }}
                type="text"
                name="description"
                className=" w-[100%] h-[60px]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="description"
                component="small"
                className="text-rose-600"
              />
              <Button variant="contained" type="submit" className="w-full py-3">
                change
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
