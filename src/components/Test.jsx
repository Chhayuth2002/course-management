import { Button } from "./Button";
import { FieldArray, Formik, Form, Field } from "formik";

import uuid from "react-uuid";
import { ErrorMsg } from "./ErrorMsg";
import { CourseValidate } from "../schemas";
import { ChapterForm } from "./form/ChapterForm";
import { SelectField, TextAreaField, TextInputField } from "./InputField";

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
          name: "",
          content: "",
        },
      ],
    },
  ],
};

export const Testing = ({
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
        {({ values, handleChange, resetForm, dirty }) => {
          return (
            <Form>
              <div className=" text-xl font-semibold mb-4">New course</div>
              {/* Couse Form */}
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-3">
                  <div className="flex flex-col  w-full">
                    {/* <TextInput
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <ErrorMsg name="name" /> */}
                    <Field
                      name="name"
                      label="Course name"
                      component={TextInputField}
                      placeholder="Course name"
                      //   className="bg-gray-50 h-10 border border-gray-300 text-sm rounded-lg p-2.5"
                    />
                  </div>
                  <div className="flex flex-col  w-full">
                    {/* <Dropdown
                      data={categoryData}
                      onChange={handleChange}
                      label="Category"
                      className="w-full"
                      name="category_id"
                      value={values.category_id}
                      placeHolder="Select a category"
                    />
                    <ErrorMsg name="category_id" /> */}
                    <Field
                      name="category_id"
                      label="Category"
                      component={SelectField}
                      placeholder="Select category"
                      data={categoryData}
                    />
                  </div>
                </div>
                <Field
                  name="summarize"
                  label="Course summarize"
                  component={TextAreaField}
                  placeholder="Course summary"
                />
                <div className="my-2 flex justify-between">
                  <div className=" text-xl font-semibold mb-4">Chapter</div>
                </div>
                <FieldArray name="chapters">
                  {({ push, remove }) => (
                    <>
                      <div className="grid grid-cols-2 gap-3 ">
                        {values.chapters?.map((chapterForm, index) => (
                          <ChapterForm
                            key={index}
                            push={push}
                            remove={remove}
                            chapterForm={chapterForm}
                            chapterIndex={index}
                            handleChange={handleChange}
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
                  {!selectedItem.id ? "Save" : "Update"}
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
