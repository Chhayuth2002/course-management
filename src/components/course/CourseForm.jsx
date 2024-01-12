import { useEffect, useState } from "react";
import { Dropdown, TextArea, TextInput } from "../Input";
import { Button } from "../Button";
import { ChapterForm } from "../chapter/ChapterForm";
import uuid from "react-uuid";

export const CourseForm = ({
  categoryData,
  onAdd,
  onEdit,
  selectedItem,
  setSelectedItem,
}) => {
  const [form, setForm] = useState({
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
  });

  const handleCourseFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleChapterFormChange = (e, chapterIndex) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => {
      prev.chapters[chapterIndex][name] = value;

      return {
        ...prev,
      };
    });
  };

  const handleLessonFormChange = (e, chapterIndex, lessonIndex) => {
    const { name, value } = e.target;

    setForm((prev) => {
      prev.chapters[chapterIndex].lessons[lessonIndex][name] = value;

      return {
        ...prev,
      };
    });
  };

  // Add
  const onSaveCourse = () => {
    const data = {
      ...form,
      id: uuid(),
    };
    onAdd(data);

    onReset();
  };

  const onEditCourse = () => {
    onEdit(form);
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

  const removeChapter = (index) => {
    let list = { ...form };
    list.chapters.splice(index, 1);

    console.log(list);
    setForm(list);
  };

  const onReset = () => {
    setForm({
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
    });
    setSelectedItem({});
  };

  useEffect(() => {
    if (selectedItem.id) {
      setForm(selectedItem);
    }
  }, [selectedItem]);

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
            data={categoryData}
            onChange={handleCourseFormChange}
            label="Category"
            className="w-full"
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
          {form?.chapters?.map((chapForm, index) => (
            <ChapterForm
              key={index}
              index={index}
              chapForm={chapForm}
              handleFormChange={handleChapterFormChange}
              setForm={setForm}
              removeChapter={removeChapter}
              form={form}
              handleLessonFormChange={handleLessonFormChange}
            />
          ))}
        </div>
        <div className=" flex items-center justify-center p-4">
          <Button onClick={onAddChapter}>Add new chapter</Button>
        </div>
      </div>
      <div className="my-2 gap-5">
        <Button
          className="mr-2"
          onClick={!selectedItem.name ? onSaveCourse : onEditCourse}
        >
          {!selectedItem.name ? "Save" : "Update"}
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
};
