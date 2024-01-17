import uuid from "react-uuid";
import { Button } from "../Button";
import { TextArea, TextInput } from "../Input";
import { LessonForm } from "../lesson/LessonForm";
import { X } from "lucide-react";

export const ChapterForm = ({
  index,
  form,
  handleFormChange,
  setNestedForm,
  removeChapter,
  nestedForm,
}) => {
  const onAddLesson = () => {
    const newLesson = {
      id: uuid(),
      lname: "",
      content: "",
    };

    setNestedForm((prev) => {
      const chapterList = prev.chapters.map((chapter, cindex) => {
        if (cindex === index) {
          return { ...chapter, lessons: [...chapter.lessons, newLesson] };
        }
        return chapter;
      });
      return { ...prev, chapters: chapterList };
    });
  };

  const removeLesson = (chapIndex, lessIndex) => {
    console.log(chapIndex, lessIndex);

    let lessonLists = [...nestedForm[chapIndex].lessons];

    lessonLists.splice(lessIndex, 1);

    setNestedForm((prev) => {
      const chapterList = prev.map((chapter, index) => {
        if (chapIndex === index) {
          return { ...chapter, lessons: lessonLists };
        }
        return chapter;
      });
      return chapterList;
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
          name="cname"
          value={form.name}
          className="w-full"
          label="Name"
        />
        <TextArea
          name="csummarize"
          value={form.summarize}
          onChange={(e) => handleFormChange(e, index)}
          className="w-full"
          label="Summarize"
        />
      </div>
      <div className="my-2 flex justify-between mb-2">
        <div className=" text-xl font-semibold mb-4">Lesson</div>
      </div>
      {form?.lessons?.map((lesson, i) => (
        <LessonForm
          key={i}
          form={lesson}
          lessIndex={i}
          chapIndex={index}
          handleFormChange={handleFormChange}
          removeLesson={removeLesson}
        />
      ))}
      <div className="flex items-center justify-center">
        <Button onClick={onAddLesson}>Add new lesson</Button>
      </div>
    </div>
  );
};
