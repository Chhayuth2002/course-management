import { Button } from "../Button";
import { TextArea, TextInput } from "../Input";
import { LessonForm } from "../lesson/LessonForm";

export const ChapterForm = ({ index, form, handleFormChange, onAddLesson }) => {
  // console.log("Chapter form", form);
  return (
    <div className="shadow-lg rounded-md border p-5">
      <div className=" gap-10">
        <TextInput
          onChange={(e) => handleFormChange(e, index)}
          name="name"
          value={form.name}
          className="w-full"
          label="Name"
        />
        <TextArea
          name="summarize"
          value={form.summarize}
          onChange={(e) => handleFormChange(e, index)}
          className="w-full"
          label="Summarize"
        />
      </div>
      <div className="my-2 flex justify-between mb-2">
        <div className=" text-xl font-semibold mb-4">Lesson</div>
        <Button onClick={onAddLesson}>Add new lesson</Button>
      </div>
      {form?.lessons?.map((lesson, i) => (
        <LessonForm
          key={i}
          form={lesson}
          lessIndex={i}
          chapIndex={index}
          handleFormChange={handleFormChange}
        />
      ))}
    </div>
  );
};
