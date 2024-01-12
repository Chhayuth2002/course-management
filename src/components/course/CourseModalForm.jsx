import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { Dropdown, TextArea, TextInput } from "../Input";
import { ChapterForm } from "../chapter/ChapterForm";
import { Button } from "../Button";

export const CourseModalForm = ({
  setIsShowFormModal,
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
  const [errors, setErrors] = useState({});

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
    <div className="fixed z-10 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl  m-4">
        <div className="px-6 py-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            New Course
          </h3>
        </div>
        <div className=" p-6 overflow-y-auto max-h-[70vh]">
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
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
          <button
            type="button"
            onClick={() => setIsShowFormModal(false)}
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto sm:text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
