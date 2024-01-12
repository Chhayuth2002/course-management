import uuid from "react-uuid";
import { Button } from "../Button";
import { TextArea, TextInput } from "../Input";
import { LessonForm } from "../lesson/LessonForm";
import { X } from "lucide-react";

export const ChapterForm = ({
  index,
  chapForm,
  handleFormChange,
  setForm,
  removeChapter,
  handleLessonFormChange,
}) => {
  const onAddLesson = () => {
    const newLesson = {
      id: uuid(),
      name: "",
      content: "",
    };

    setForm((prev) => {
      const chapterList = prev.chapters.map((chapter, cindex) =>
        cindex === index
          ? { ...chapter, lessons: [...chapter.lessons, newLesson] }
          : chapter
      );
      return { ...prev, chapters: chapterList };
    });
  };

  const removeLesson = (chapIndex, lessIndex) => {
    setForm((prevForm) => {
      const updatedChapters = [...prevForm.chapters];
      const updatedLessons = [...updatedChapters[chapIndex].lessons];

      updatedLessons.splice(lessIndex, 1);

      updatedChapters[chapIndex] = {
        ...updatedChapters[chapIndex],
        lessons: updatedLessons,
      };

      return {
        ...prevForm,
        chapters: updatedChapters,
      };
    });
  };

  return (
    <div className="shadow-lg rounded-md border p-5">
      <div className=" items-end justify-end flex">
        <Button onClick={() => removeChapter(index)} variant="icon">
          <X />
        </Button>
      </div>
      <div className=" gap-10">
        <TextInput
          onChange={(e) => handleFormChange(e, index)}
          name="name"
          value={chapForm.name}
          className="w-full"
          label="Name"
        />
        <TextArea
          name="summarize"
          value={chapForm.summarize}
          onChange={(e) => handleFormChange(e, index)}
          className="w-full"
          label="Summarize"
        />
      </div>
      <div className="my-2 flex justify-between mb-2">
        <div className=" text-xl font-semibold mb-4">Lesson</div>
      </div>
      {chapForm?.lessons?.map((lesson, i) => (
        <LessonForm
          key={i}
          form={lesson}
          lessIndex={i}
          chapIndex={index}
          removeLesson={removeLesson}
          handleLessonFormChange={handleLessonFormChange}
        />
      ))}
      <div className="flex items-center justify-center">
        <Button onClick={onAddLesson}>Add new lesson</Button>
      </div>
    </div>
  );
};
