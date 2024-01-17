import { Dropdown, TextArea, TextInput } from "../Input";
import { Button } from "../Button";
import { FieldArray, Formik, Form } from "formik";
import { ChapterFormik } from "./ChapterFormik";
import uuid from "react-uuid";
import { CourseValidate } from "../../schemas";
import { ErrorMsg } from "../ErrorMsg";

const initValue = {
  name: "",
  category_id: "",
  summarize: "",
  chapters: [
    {
      id: uuid(),
      name: "",
      summarize: "",
      lessons: [
        {
          id: uuid(),
          lname: "",
          content: "",
        },
      ],
    },
  ],
};

export const CourseForm = ({
  categoryData,
  onAdd,
  onEdit,
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div className="shadow-xl bg-white p-3 mb-20 rounded-md ">
      <Formik
        enableReinitialize={true}
        initialValues={!selectedItem.id ? initValue : selectedItem}
        onSubmit={(values, actions) => {
          if (selectedItem.id) {
            onEdit(values);
            setSelectedItem({});
          } else {
            onAdd(values);
          }
          actions.resetForm();
        }}
        validationSchema={CourseValidate}
      >
        {({
          values,
          handleChange,
          resetForm,
          dirty,
          errors,
          touched,
          handleBlur,
        }) => {
          return (
            <Form>
              <div className=" text-xl font-semibold mb-4">New course</div>
              {/* Couse Form */}
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-3">
                  <div className="flex flex-col  w-full">
                    <TextInput
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      // error={errors.name && touched.name ? errors.name : null}
                    />
                    <ErrorMsg name="name" />
                  </div>
                  <div className="flex flex-col  w-full">
                    <Dropdown
                      data={categoryData}
                      onChange={handleChange}
                      label="Category"
                      className="w-full"
                      name="category_id"
                      value={values.category_id}
                      onBlur={handleBlur}
                      placeHolder="Select a category"
                      error={
                        errors.category_id && touched.category_id
                          ? errors.category_id
                          : null
                      }
                    />
                    <ErrorMsg name="category_id" />
                  </div>
                </div>
                <TextArea
                  label="Summarize"
                  onChange={handleChange}
                  value={values.summarize}
                  name="summarize"
                  onBlur={handleBlur}
                  error={
                    errors.summarize && touched.summarize
                      ? errors.summarize
                      : null
                  }
                />
                <ErrorMsg name="summarize" />
                <div className="my-2 flex justify-between">
                  <div className=" text-xl font-semibold mb-4">Chapter</div>
                </div>
                <FieldArray name="chapters">
                  {({ push, remove }) => (
                    <>
                      <div className="grid grid-cols-2 gap-3 ">
                        {values.chapters?.map((chapterForm, index) => (
                          <ChapterFormik
                            key={index}
                            push={push}
                            remove={remove}
                            chapterForm={chapterForm}
                            chapterIndex={index}
                            handleChange={handleChange}
                            errors={errors}
                            handleBlur={handleBlur}
                            touched={touched}
                          />
                        ))}
                      </div>
                      <div className=" flex items-center justify-center p-2 ">
                        <Button
                          type="button"
                          onClick={() =>
                            push({
                              id: uuid(),
                              name: "",
                              summarize: "",
                              lessons: [{ id: uuid(), name: "", content: "" }],
                            })
                          }
                        >
                          Add new chapter
                        </Button>
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
              <div className="my-2 gap-5">
                <Button className="mr-2" type="submit" isDisable={!dirty}>
                  Save
                </Button>
                <Button onClick={() => resetForm()}>Reset</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
