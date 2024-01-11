import { useState } from "react";
import { Dropdown, TextArea, TextInput } from "../Input";
import { Button } from "../Button";
import { ChapterForm } from "../chapter/ChapterForm";
import uuid from "react-uuid";

export const CourseForm = ({ categoryData, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    summarize: "",
    category_id: "",
    chapters: [],
  });

  const [nestedForm, setNestedForm] = useState([
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
  ]);

  const handleCourseFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleNestedFormChange = (e, index, lesIndex) => {
    const name = e.target.name;
    const value = e.target.value;

    setNestedForm((prev) => {
      const updatedForm = [...prev];

      updatedForm[index][name] = value;

      updatedForm[index] = {
        ...updatedForm[index],
        lessons: updatedForm[index].lessons.map((lesson, i) =>
          i === lesIndex ? { ...lesson, [name]: value } : lesson
        ),
      };
      return updatedForm;
    });
  };

  const onClick = () => {
    const data = {
      ...form,
      id: uuid(),
      chapters: nestedForm,
    };

    onAdd(data);

    onReset();
  };

  const onAddChapter = () => {
    const newChapter = {
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
    };

    setNestedForm((prev) => {
      return [...prev, newChapter];
    });
  };

  const removeChapter = (index) => {
    let chapterLists = [...nestedForm];
    chapterLists.splice(index, 1);
    setNestedForm(chapterLists);
  };

  const onReset = () => {
    setForm({ name: "", category_id: "", summarize: "" });
    setNestedForm([
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
    ]);
  };

  return (
    <div className="shadow-xl bg-white p-3 mb-20 rounded-md ">
      <div className=" text-xl font-semibold mb-4">New course</div>
      <div className="flex flex-col">
        <div className="flex flex-row w-full gap-3">
          <TextInput
            label="Name"
            className="w-full"
            name="name"
            value={form.name}
            onChange={handleCourseFormChange}
          />
          <Dropdown
            className="w-full"
            data={categoryData}
            onChange={handleCourseFormChange}
            label="Category"
            name="category_id"
            value={form.category_id}
            placeHolder="Select a category"
          />
        </div>
        <TextArea
          label="Summarize"
          onChange={handleCourseFormChange}
          value={form.summarize}
          name="summarize"
        />

        <div className="my-2 flex justify-between">
          <div className=" text-xl font-semibold mb-4">Chapter</div>
        </div>
        <div className="grid grid-cols-2 gap-3 ">
          {nestedForm?.map((chapForm, index) => (
            <ChapterForm
              key={index}
              index={index}
              form={chapForm}
              handleFormChange={handleNestedFormChange}
              setNestedForm={setNestedForm}
              removeChapter={removeChapter}
              nestedForm={nestedForm}
            />
          ))}
        </div>
        <div className=" flex items-center justify-center p-4">
          <Button onClick={onAddChapter}>Add new chapter</Button>
        </div>
      </div>
      <div className="my-2 gap-5">
        <Button className="mr-2" onClick={onClick}>
          Save
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
};
