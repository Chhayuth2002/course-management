import { Edit, Trash } from "lucide-react";
import { Button } from "../Button";

export const CourseTable = ({ data, onDelete, selectedItem, entity }) => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Course Management</h1>
        <Button onClick={() => {}}>Add new course</Button>
      </div>
      <div className="flex justify-center my-5 border-b-2 bg-white shadow-md rounded-xl">
        <div className="flex flex-col items-center justify-center w-full">
          <table className="w-full overflow-scroll">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700 border-t">
                <th className="py-3 px-4 text-left">Id </th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Summarize</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Total Chapter</th>
                <th className="py-3 px-4 text-left">Total Lesson</th>
                <th className="py-3 px-4 text-left w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {data?.length ? (
                <>
                  {data?.map((d) => (
                    <tr key={d.id} className="border border-b">
                      <td className="px-3 py-4 ">{d.id}</td>
                      <td className="px-3 py-4">{d.name}</td>
                      <td className="px-3 py-4">{d.summarize}</td>
                      <td className="px-3 py-4">{d.category}</td>
                      <td className="px-3 py-4">{d.total_chapters}</td>
                      <td className="px-3 py-4">{d.total_lessons}</td>
                      <td className="px-3 py-4">
                        <Button
                          onClick={() => selectedItem(d.id, entity)}
                          className="mr-2 text-blue-400"
                          variant="icon"
                        >
                          <Edit />
                        </Button>

                        <Button
                          onClick={() => onDelete(d.id, entity)}
                          className="text-rose-500"
                          variant="icon"
                        >
                          <Trash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="border border-b text-center text-3xl">
                  <td colSpan="7" className="py-4">
                    No course data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
