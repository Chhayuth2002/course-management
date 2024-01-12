import { ErrorMessage } from "formik";
export const ErrorMsg = ({ name }) => {
  return (
    <div className="text-sm mb-2 italic text-rose-500">
      <ErrorMessage name={name} />
    </div>
  );
};
