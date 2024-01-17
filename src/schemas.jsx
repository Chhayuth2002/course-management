import * as Yup from "yup";

export const CourseValidate = Yup.object({
  name: Yup.string()
    .required("Course name is required")
    .min(3, "Course must be at least 3"),
  summarize: Yup.string()
    .min(3, "Course summarize must be at least 3")
    .required("Course summarize is required"),
  category_id: Yup.string().required("Category is required"),
  chapters: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Chapter name is required")
        .min(3, "Chapter name must be at least 3"),
      summarize: Yup.string()
        .min(3, "Chapter summarize must be at least 3")
        .required("Chapter summarize is required"),
      lessons: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Lesson name is required")
            .min(3, "Lesson name must be at least 3"),
          content: Yup.string()
            .min(3, "Lesson content must be at least 3")
            .required("Lesson content is required"),
        })
      ),
    })
  ),
});

export const CategoryValidate = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 letter"),
  code: Yup.string()
    .required("Code is required")
    .min(2, "Code must be at least 3 letter"),
});
