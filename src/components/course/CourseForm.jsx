import { useState } from "react";
import { Dropdown, TextArea, TextInput } from "../Input";
import { Button } from "../Button";
import { ChapterForm } from "../chapter/ChapterForm";
import uuid from "react-uuid";

export const CourseForm = ({ categoryData, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    category_id: "",
    summarize: "",
    chapters: [
      {
        id: uuid(),
        cname: "",
        csummarize: "",
        lessons: [
          {
            id: uuid(),
            lname: "",
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

  const [errors, setErrors] = useState({});

  // Handle chapter and lesson form change
  const handleNestedFormChange = (e, index, lesIndex) => {
    const name = e.target.name;
    const value = e.target.value;
    let updateForm = { ...form };

    setForm((prev) => {
      let chapterForm = [...prev.chapters];
      chapterForm[index][name] = value;

      updateForm = [
        ...updateForm,
        updateForm,
        (chapters = [...chapterForm[index], chapterForm[index]]),
      ];
      return updateForm;
    });
  };

  console.log(form);

  // Add
  const onClick = () => {
    const checkError = {
      name: !form.name ? "Course name is required" : "",
      category_id: !form.category_id ? "Category is required" : "",
      summarize: !form.summarize ? "Course summarize is required" : "",
      // chapters: nestedForm.map((chapter) => {
      //   const checkLessonError = chapter.lessons.map((lesson) => {
      //     return {
      //       name: lesson.name ? "Lesson name is required" : "",
      //       content: lesson.content ? "Lesson content is required" : "",
      //     };
      //   });

      //   return {
      //     name: chapter.name ? "Chapter name is required" : "",
      //     summarize: chapter.summarize ? "Chapter summarize is required" : "",
      //     lessons: checkLessonError,
      //   };
      // }),
    };

    setErrors(checkError);

    const data = {
      ...form,
      id: uuid(),
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

    setForm((prev) => {
      return {
        ...prev,
        chapters: [...prev.chapters, newChapter],
      };
    });
  };

  const removeChapter = (index) => {
    let chapterLists = [...form];
    chapterLists.splice(index, 1);
    setForm(chapterLists);
  };

  const onReset = () => {
    setForm({
      name: "",
      category_id: "",
      summarize: "",
      chapters: [
        {
          id: uuid(),
          cname: "",
          csummarize: "",
          lessons: [
            {
              id: uuid(),
              lname: "",
              content: "",
            },
          ],
        },
      ],
    });
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
            error={errors.name}
          />
          <Dropdown
            data={categoryData}
            onChange={handleCourseFormChange}
            label="Category"
            className="w-full"
            name="category_id"
            value={form.category_id}
            placeHolder="Select a category"
            error={errors.category_id}
          />
        </div>
        <TextArea
          label="Summarize"
          onChange={handleCourseFormChange}
          value={form.summarize}
          name="summarize"
          error={errors.summarize}
        />

        <div className="my-2 flex justify-between">
          <div className=" text-xl font-semibold mb-4">Chapter</div>
        </div>
        <div className="grid grid-cols-2 gap-3 ">
          {form?.chapters?.map((chapForm, index) => (
            <ChapterForm
              key={index}
              index={index}
              form={chapForm}
              handleFormChange={handleNestedFormChange}
              setNestedForm={setForm}
              removeChapter={removeChapter}
              nestedForm={form}
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
