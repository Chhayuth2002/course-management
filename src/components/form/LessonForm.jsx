import { Button } from "../Button";
import { X } from "lucide-react";
import { TextArea, TextInput } from "../Input";
import { ErrorMsg } from "../ErrorMsg";

export const LessonForm = ({
  remove,
  lessonForm,
  lessonIndex,
  chapterIndex,
  handleChange,
}) => {
  return (
    <div className="gap-2 my-3">
      <div className="shadow-lg rounded-md border p-2">
        <div className=" items-end justify-end flex">
          <Button onClick={() => remove(lessonIndex)} variant="icon">
            <X />
          </Button>
        </div>
        <div className=" gap-2">
          <TextInput
            className="w-full"
            label="Name"
            name={`chapters.${chapterIndex}.lessons.${lessonIndex}.name`}
            value={lessonForm.name}
            onChange={handleChange}
          />
          <ErrorMsg
            name={`chapters.${chapterIndex}.lessons.${lessonIndex}.name`}
          />
          <TextArea
            className="w-full"
            label="Content"
            name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content`}
            value={lessonForm.content}
            onChange={handleChange}
          />
          <ErrorMsg
            name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content`}
          />
        </div>
      </div>
    </div>
  );
};
