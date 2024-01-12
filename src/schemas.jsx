import * as Yup from "yup";

export const CourseValidate = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Name must be at"),
});

export const CategoryValidate = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 letter"),
  code: Yup.string()
    .required("Code is required")
    .min(2, "Code must be at least 3 letter"),
});
