import { useState } from "react";
import { Dropdown, TextArea, TextInput } from "../Input";
import { Button } from "../Button";
import { ChapterForm } from "../chapter/ChapterForm";
import uuid from "react-uuid";

export const CourseForm = ({ categoryData, onAdd }) => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    summarize: "",
    category_id: "",
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
  });

  const handleCourseFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleChapterFormChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    let chaptLists = [...form.chapters];
    chaptLists[index][name] = value;

    setForm({ ...form, chapters: chaptLists });
  };

  const onClick = () => {
    onAdd(form);
    setCourses(courses.concat(form));
  };

  const onAddChapter = () => {
    const newChapter = {
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
    };

    setForm((prev) => {
      return {
        ...prev,
        chapters: [...prev.chapters, newChapter],
      };
    });
  };

  // const onAddLesson = () => {
  //   const newLesson = {
  //     id: uuid(),
  //     name: "",
  //     content: "",
  //   };

  //   setForm((prev) => {
  //     return {
  //       ...prev,
  //     };
  //   });
  // };

  console.log("Course form", form);

  return (
    <div className=" shadow-lg bg-white p-3">
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
          <Button onClick={onAddChapter}>Add new chapter</Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {form?.chapters?.map((chapForm, index) => (
            <ChapterForm
              key={index}
              index={index}
              form={chapForm}
              handleFormChange={handleChapterFormChange}
              // onAddLesson={onAddLesson}
            />
          ))}
        </div>
      </div>
      <div className="my-4 items-center justify-center flex gap-5">
        <Button onClick={onClick}>Save</Button>
        <Button>Reset</Button>
      </div>
    </div>
  );
};
