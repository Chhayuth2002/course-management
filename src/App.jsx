import { useMemo, useState } from "react";
import { CategoryTable } from "./components/category/CategoryTable";
import uuid from "react-uuid";
import { CourseTable } from "./components/course/CourseTable";
import { CourseForm } from "./components/course/CourseForm";
import categoryData from "./data/categories";

function App() {
  const [categories, setCategories] = useState(categoryData);
  const [courses, setCourses] = useState([]);

  const courseData = useMemo(() => {}, []);

  // Add
  const onAddCategory = (form) => {
    const newCategory = {
      id: uuid(),
      ...form,
    };

    setCategories(categories.concat(newCategory));
    console.log("added", form);
  };

  const onAddCourse = (form) => {
    setCourses(courses.concat(form));
  };

  console.log(courses);

  return (
    <div className="max-w-[2000px] mx-auto container">
      <div className="flex items-center justify-center p-10">
        <div className=" text-3xl font-semibold">Mini Course Management</div>
      </div>
      <div className="mx-20">
        <div className="w-full">
          <CategoryTable onAdd={onAddCategory} data={categories} />
          <CourseTable data={courseData} />
          <CourseForm categoryData={categories} onAdd={onAddCourse} />
        </div>
      </div>
    </div>
  );
}

export default App;