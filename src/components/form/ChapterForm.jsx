import { TextArea, TextInput } from "../Input";
import { Button } from "../Button";
import { X } from "lucide-react";
import { FieldArray } from "formik";
import { LessonForm } from "./LessonForm";
import uuid from "react-uuid";
import { ErrorMsg } from "../ErrorMsg";

export const ChapterForm = ({
  remove,
  chapterForm,
  handleChange,
  chapterIndex,
}) => {
  return (
    <div className="shadow-lg rounded-md border p-5">
      <div className=" items-end justify-end flex">
        <Button
          onClick={() => remove(chapterIndex)}
          variant="icon"
          type="button"
        >
          <X />
        </Button>
      </div>
      <div className=" gap-10">
        <TextInput
          label="Name"
          className="w-full"
          value={chapterForm.name}
          name={`chapters.${chapterIndex}.name`}
          onChange={handleChange}
        />
        <ErrorMsg name={`chapters.${chapterIndex}.name`} />

        <TextArea
          label="Name"
          className="w-full"
          value={chapterForm.summarize}
          name={`chapters.${chapterIndex}.summarize`}
          onChange={handleChange}
        />
        <ErrorMsg name={`chapters.${chapterIndex}.summarize`} />
      </div>
      <div className="my-2 flex justify-between mb-2">
        <div className=" text-xl font-semibold mb-4">Lesson</div>
      </div>

      <FieldArray name={`chapters.${chapterIndex}.lessons`}>
        {({ push, remove }) => (
          <>
            {chapterForm.lessons.map((lessonForm, index) => (
              <LessonForm
                key={index}
                push={push}
                remove={remove}
                lessonForm={lessonForm}
                lessonIndex={index}
                chapterIndex={chapterIndex}
                handleChange={handleChange}
              />
            ))}
            <div className="flex items-center justify-center">
              <Button
                onClick={() => push({ id: uuid(), name: "", content: "" })}
              >
                Add new lesson
              </Button>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};
