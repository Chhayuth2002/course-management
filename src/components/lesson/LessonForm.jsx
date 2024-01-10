import { X } from "lucide-react";
import { Button } from "../Button";
import { TextArea, TextInput } from "../Input";

export const LessonForm = ({
  lessIndex,
  form,
  handleFormChange,
  chapIndex,
  removeLesson,
}) => {
  // console.log("Lesson form ", form);
  return (
    <>
      <div className="gap-2 my-3">
        <div className="shadow-lg rounded-md border p-2">
          <div className=" items-end justify-end flex">
            <Button
              onClick={() => removeLesson(chapIndex, lessIndex)}
              variant="icon"
            >
              <X />
            </Button>
          </div>
          <div className=" gap-2">
            <TextInput
              className="w-full"
              label="Name"
              name="lname"
              value={form.name}
              onChange={(e) => handleFormChange(e, chapIndex, lessIndex)}
            />
            <TextArea
              className="w-full"
              label="Content"
              name="content"
              value={form.content}
              onChange={(e) => handleFormChange(e, chapIndex, lessIndex)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
