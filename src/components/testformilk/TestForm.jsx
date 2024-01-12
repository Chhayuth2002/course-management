import { Formik, useFormik } from "formik";
import { Button } from "../Button";
import * as Yup from "yup";
import { useState } from "react";

const inputSchemas = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const TestForm = () => {
  const [data, setData] = useState([]);
  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: inputSchemas,
      onSubmit: (values) => {
        setData(data.concat(values));
      },
    });

  console.log(errors);

  return (
    <div className="shadow-xl bg-white p-3 mb-20 rounded-md ">
      <div className=" text-xl font-semibold mb-4">New course</div>

      <div className="flex flex-col">
        <div className="my-2 flex justify-between">
          <div className=" text-xl font-semibold mb-4">Chapter</div>
        </div>
        <div className=" flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-center items-center "
          >
            <h1 className="text-4xl mb-10 font-Pacifico text-[#131210ee]"></h1>
            <input
              className="border"
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
            />
            {errors.username && touched.user && (
              <p className="text-rose-500">{errors.username}</p>
            )}
            <input
              className="border"
              type="text"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="text-rose-500">{errors.email}</p>
            )}
            <input
              className="border"
              type="text"
              onBlur={handleBlur}
              name="password"
              onChange={handleChange}
              value={values.password}
            />

            <div className="my-2 gap-5">
              <Button className="mr-2" type="submit">
                Save
              </Button>
              <Button>Reset</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
