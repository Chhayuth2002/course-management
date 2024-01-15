import { X } from "lucide-react";
import { Button } from "../Button";
import { TextInput } from "../Input";
import { useFormik, Field, Form } from "formik";
import { CategoryValidate } from "../../schemas";
import { TextInputField } from "../InputField";

export const CategoryForm = ({
  setIsShowModal,
  handleAdd,
  value,
  handleEdit,
}) => {
  const {
    values,

    handleChange,
    handleBlur,
    touched,
    errors,
    dirty,
    resetForm,
  } = useFormik({
    initialValues: {
      name: value?.name || "",
      code: value?.code || "",
      id: value?.id,
    },
    validationSchema: CategoryValidate,
    onSubmit: (values) => {
      if (value.id) {
        handleEdit(values);
      } else {
        handleAdd(values);
      }
      setIsShowModal(false);
      resetForm();
    },
  });

  const onCloseForm = () => {
    setIsShowModal(false);
    resetForm();
  };

  return (
    <div className=" bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
      <div className="relative p-4  w-2/4  h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <Button
            onClick={onCloseForm}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            variant="icon"
          >
            <X />
          </Button>

          <div className="flex flex-col p-5">
            <div className="w-full flex justify-between py-4">
              <div className="mb-2 text-3xl text-center font-semibold  ">
                {value.id ? "Edit: " + value.name : "Create category"}
              </div>
            </div>
            <Form>
              <div className="gap-x-3 items-center justify-center grid-cols-2 grid">
                <Field
                  name="name"
                  component={TextInputField}
                  placeholder="Category name"
                />

                <TextInput
                  label="Code"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.code && touched.code ? errors.code : null}
                />
                <div>
                  <Button className="mr-2" type="submit" isDisable={!dirty}>
                    Save
                  </Button>
                  <Button type="button" onClick={() => resetForm()}>
                    Clear
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
