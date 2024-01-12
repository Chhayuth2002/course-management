import { X } from "lucide-react";
import { useState } from "react";

export const CourseDetail = ({ data, setIsShowModal }) => {
  return (
    <div className=" bg-black/50 overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
      <div className="relative p-4 w-full max-h-6xl max-w-6xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={() => setIsShowModal(false)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <X />
          </button>

          <div className="flex flex-col p-5">
            <div className="p-5 w-full ">
              <div className="mb-2  text-center ">
                <div className=" text-2xl">
                  Course: <span className=" font-semibold"> {data.name}</span>
                </div>
                <div className="">{data.summarize}</div>
              </div>
              <div className="grid grid-cols-2">
                {data?.chapters?.map((chapter, index) => (
                  <div className="p-5 border m-2  rounded-xl " key={chapter.id}>
                    <div className="mb-2 text-2xl ">
                      Chapter {index + 1}: {chapter.name}
                    </div>
                    <p className=" text-xs">{chapter.summarize}</p>
                    {chapter?.lessons?.map((lesson, index) => (
                      <div key={lesson.id}>
                        <div className="ml-3 mt-2 text-xl border-b-2">
                          Lesson {index + 1}: {lesson.name}
                          {/* <div className="text-xs">{lesson.content}</div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
