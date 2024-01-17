import { useMemo, useState } from "react";
import { CategoryTable } from "./components/table/CategoryTable";
import { CourseTable } from "./components/table/CourseTable";
import { CourseForm } from "./components/course/CourseForm";

import courseData from "./data/courses";
import categoryData from "./data/categories";

import uuid from "react-uuid";
function App() {
  const [categories, setCategories] = useState(categoryData);
  const [courses, setCourses] = useState(courseData);
  const [selectedItem, setSelectedItem] = useState({});

  // Category
  const onAddCategory = (form) => {
    const newCategory = {
      ...form,
      id: uuid(),
    };

    setCategories(categories.concat(newCategory));
  };

  const onEditCategory = (form) => {
    console.log(form);
    setCategories((prev) =>
      prev.map((item) => (item.id === form.id ? { ...item, ...form } : item))
    );
  };

  const onDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  // Course
  const onAddCourse = (form) => {
    const newCourse = {
      ...form,
      id: uuid(),
    };
    setCourses(courses.concat(newCourse));
  };

  const onEditCourse = (form) => {
    console.log(form);
    setCourses((prev) =>
      prev.map((item) => (item.id === form.id ? { ...item, ...form } : item))
    );
  };

  const onDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((item) => item.id !== id));
  };

  const data = useMemo(() => {
    const result = courses.map((course) => {
      const category = categories.find(
        (category) => category.id === course.category_id
      ).name;

      const totalLessons = course.chapters.reduce(
        (sum, chapter) => sum + chapter.lessons.length,
        0
      );

      return {
        ...course,
        category,
        total_chapters: course.chapters.length,
        total_lessons: totalLessons,
      };
    });

    return result;
  }, [courses]);

  return (
    <div className="bg-slate-300">
      <div className="max-w-[2000px] mx-auto container ">
        <div className="flex items-center justify-center p-10  ">
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
            <CourseTable
              data={data}
              onDelete={onDeleteCourse}
              setSelectedItem={setSelectedItem}
            />
            <CourseForm
              categoryData={categories}
              onAdd={onAddCourse}
              onEdit={onEditCourse}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
