import { useMemo, useState } from "react";
import { CategoryTable } from "./components/category/CategoryTable";
import { CourseTable } from "./components/course/CourseTable";
import { CourseForm } from "./components/course/CourseForm";

import coursesData from "./data/courses";
import categoryData from "./data/categories";

import uuid from "react-uuid";
function App() {
  const [categories, setCategories] = useState(categoryData);
  const [courses, setCourses] = useState(coursesData);

  // Category
  const onAddCategory = (form) => {
    const newCategory = {
      ...form,
      id: uuid(),
    };

    setCategories(categories.concat(newCategory));
  };

  const onEditCategory = (form) => {
    setCategories((prev) =>
      prev.map((item) => (item.id === form.id ? { ...item, ...form } : item))
    );
  };

  const onDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  // Course
  const onAddCourse = (form) => {
    setCourses(courses.concat(form));
  };

  const onDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((item) => item.id !== id));
  };

  const onEditCourse = (id) => {};

  const data = useMemo(() => {
    const result = courses.map((course) => {
      // const category = categories.find(
      //   (category) => category.id === course.category_id
      // ).name;

      const totalLessons = course.chapters.reduce(
        (sum, chapter) => sum + chapter.lessons.length,
        0
      );

      return {
        ...course,
        // category,
        total_chapters: course.chapters.length,
        total_lessons: totalLessons,
      };
    });

    return result;
  }, [courses]);

  return (
    <div className="max-w-[2000px] mx-auto container ">
      <div className="flex items-center justify-center p-10 ">
        <div className=" text-3xl font-semibold">Mini Course Management</div>
      </div>
      <div className="mx-20">
        <div className="w-full">
          <CategoryTable
            onAdd={onAddCategory}
            data={categories}
            onEdit={onEditCategory}
            onDelete={onDeleteCategory}
          />
          <CourseTable data={data} onDelete={onDeleteCourse} />
          <CourseForm categoryData={categories} onAdd={onAddCourse} />
        </div>
      </div>
    </div>
  );
}

export default App;
