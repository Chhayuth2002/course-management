import { useMemo, useState } from "react";
import { CategoryTable } from "./components/category/CategoryTable";
import uuid from "react-uuid";
import { CourseTable } from "./components/course/CourseTable";
import { CourseForm } from "./components/course/CourseForm";
import categoryData from "./data/categories";
import coursesData from "./data/courses";

function App() {
  const [categories, setCategories] = useState(categoryData);
  const [courses, setCourses] = useState(coursesData);

  // Add category
  const onAddCategory = (form) => {
    const newCategory = {
      id: uuid(),
      ...form,
    };

    setCategories(categories.concat(newCategory));
  };

  // Edit category
  const onEditCategory = (form) => {};

  //

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
          <CourseTable data={data} />
          <CourseForm categoryData={categories} onAdd={onAddCourse} />
        </div>
      </div>
    </div>
  );
}

export default App;
