import { useMemo, useState } from "react";
import { CategoryTable } from "./components/category/CategoryTable";
import { CourseTable } from "./components/course/CourseTable";
import { CourseForm } from "./components/course/CourseForm";
import coursesData from "./data/courses";
import uuid from "react-uuid";
function App() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState(coursesData);

  // Add category
  const onAddCategory = (form) => {
    const newCategory = {
      ...form,
      id: uuid(),
    };

    // console.log(uuid());

    setCategories(categories.concat(newCategory));
  };

  console.log(categories);

  // Edit category
  const onEditCategory = (form) => {
    console.log(form);

    setCategories((prev) =>
      prev.map((item) => (item.id === form.id ? { ...prev, ...form } : prev))
    );
  };

  // Delete category
  const onDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

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

  return (
    <div className="max-w-[2000px] mx-auto container">
      <div className="flex items-center justify-center p-10">
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
          <CourseTable data={data} />
          <CourseForm categoryData={categories} onAdd={onAddCourse} />
        </div>
      </div>
    </div>
  );
}

export default App;
