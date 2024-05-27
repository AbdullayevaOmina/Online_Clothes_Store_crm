import { useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { SignIn } from "@auth-interface";
import { auth } from "@service";
import { signInValidationSchema } from "@validation";
import { setDataToCookie } from "@token-service";
import bgImg from "../../assets/clothes_store_img_for_login.jpg";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: SignIn = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const handleSubmit = async (values: SignIn) => {
    try {
      const response = await auth.sign_in(values);
      setDataToCookie("access_token", response?.data?.access_token);
      setDataToCookie("refresh_token", response?.data?.refresh_token);
      toast.success("Welcome!");
      navigate("/main");
    } catch (error) {
      console.log(error);
      toast.success("Email yoki passworda xato");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="h-screen flex justify-center items-baseline flex-col gap-8 p-5"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[620px] max-h-[620px] bg-[#edd8f7] p-32 rounded-full shadow-lg">
          <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px] text-center text-sky-600 mb-5">
            Tizimga kirish
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Submitting" : "Tizimga kirish"}
                </Button>
                <p className="mt-3">
                  <em>Hisobingiz yo'qmi?</em>{" "}
                  <Link to={"/"} className="text-sky-600">
                    <em>Ro'yxatdan o'tish</em>
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
