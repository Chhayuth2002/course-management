import { Suspense, useEffect, useMemo, useState } from 'react'
import { CategoryTable } from './components/table/CategoryTable'
import { CourseTable } from './components/table/CourseTable'
import { CourseForm } from './components/form/CourseForm'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'

const baseUrl = 'https://mini-course-backend-testing.onrender.com/api/v1'
// const baseUrl = 'http://localhost:5000/api/v1'

function App () {
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [tags, setTags] = useState([])
  const [selectedItem, setSelectedItem] = useState({})

  // Add new category
  const onAddCategory = form => {
    axios
      .post(`${baseUrl}/categories`, form)
      .then(res => setCategories(categories.concat(res.data)))
      .catch(err => console.log(err))
  }
  // Edit category
  const onEditCategory = form => {
    axios
      .put(`${baseUrl}/categories/${form.id}`, form)
      .then(res =>
        setCategories(prev =>
          prev.map(item =>
            item.id === res.data.id ? { ...item, ...res.data } : item
          )
        )
      )
      .catch(err => console.log(err))
  }
  // Delete category
  const onDeleteCategory = id => {
    axios
      .delete(`${baseUrl}/categories/${id}`)
      .then(res =>
        res ? setCategories(prev => prev.filter(item => item.id !== id)) : null
      )
      .catch(err => console.log(err))
  }

  // Add new course
  const onAddCourse = async form => {
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('summary', form.summary)
      formData.append('image_url', form.image_url)
      formData.append('category_id', form.category_id)

      form.chapters.forEach((chapter, i) => {
        formData.append(`chapters[${i}][name]`, chapter.name)
        formData.append(`chapters[${i}][summary]`, chapter.summary)

        chapter.lessons.forEach((lesson, j) => {
          formData.append(`chapters[${i}][lessons][${j}][name]`, lesson.name)
          formData.append(
            `chapters[${i}][lessons][${j}][content]`,
            lesson.content
          )
          formData.append(
            `chapters[${i}][lessons][${j}][image_url]`,
            lesson.image_url
          )
        })
      })

      form.tags.forEach((tag, i) => {
        formData.append(`tags[${i}][value]`, tag.value)
        formData.append(`tags[${i}][label]`, tag.label)
        formData.append(`tags[${i}][__isNew__]`, tag.__isNew__)
      })

      const response = await axios.post(`${baseUrl}/courses`, formData)

      if (response.data.id) {
        setCourses(courses.concat(response.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Edit course
  const onEditCourse = async form => {
    console.log(form)
    try {
      const transformedTags = [
        // Include existing tags
        ...form.tags.map(tag => ({
          id: tag.__isNew__ ? '' : tag.id || tag.value,
          name: tag.name || tag.value,
          _delete: false,
          __isNew__: tag.__isNew__ || false
        })),

        // Include new tags from removeTag
        ...form.removeTag.map(removeItem => ({
          id: removeItem.id,
          _delete: true
        }))
      ]

      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('summary', form.summary)
      formData.append('image_url', form.image_url)
      formData.append('category_id', form.category_id)

      form.chapters.forEach((chapter, i) => {
        formData.append(`chapters[${i}][id]`, chapter.id || '')
        formData.append(`chapters[${i}][name]`, chapter.name)
        formData.append(`chapters[${i}][summary]`, chapter.summary)
        formData.append(`chapters[${i}][_delete]`, chapter._delete || false)

        chapter.lessons.forEach((lesson, j) => {
          formData.append(`chapters[${i}][lessons][${j}][id]`, lesson.id || '')
          formData.append(`chapters[${i}][lessons][${j}][name]`, lesson.name)
          formData.append(
            `chapters[${i}][lessons][${j}][content]`,
            lesson.content
          )
          formData.append(
            `chapters[${i}][lessons][${j}][image_url]`,
            lesson.image_url
          )
          formData.append(
            `chapters[${i}][lessons][${j}][_delete]`,
            lesson._delete || false
          )
        })
      })

      transformedTags.forEach((tag, i) => {
        formData.append(`tags[${i}][id]`, tag.id)
        formData.append(`tags[${i}][name]`, tag.name || '')
        formData.append(`tags[${i}][__isNew__]`, tag.__isNew__ || false)
        formData.append(`tags[${i}][_delete]`, tag._delete || false)
      })

      const response = await axios.put(
        `${baseUrl}/courses/${form.id}`,
        formData
      )

      if (response.data.id) {
        setCourses(prev =>
          prev.map(item =>
            item.id === response.data.id ? { ...item, ...response.data } : item
          )
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Delele course
  const onDeleteCourse = id => {
    axios.delete(`${baseUrl}/courses/${id}`).then(res => {
      console.log(res.data)
      if (res.data === 1)
        setCourses(prev => prev.filter(item => item.id !== id))
    })
  }

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    axios
      .get(`${baseUrl}/courses`)
      .then(res => setCourses(res.data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    axios
      .get(`${baseUrl}/tags`)
      .then(res => setTags(res.data))
      .catch(err => console.error(err))
  }, [courses])

  const data = useMemo(() => {
    const result = courses?.map(course => {
      const category = categories?.find(
        category => category.id === course.category_id
      )?.name

      const totalLessons = course?.chapters?.reduce(
        (sum, chapter) => sum + chapter.lessons.length,
        0
      )

      return {
        ...course,
        category,
        total_chapters: course?.chapters?.length,
        total_lessons: totalLessons
      }
    })

    return result
  }, [courses, categories])

  const Loading = () => {
    return <Loader2Icon className=' animate-spin' />
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='bg-slate-300'>
        <div className='max-w-[2000px] mx-auto container '>
          <div className='flex items-center justify-center p-10  '>
            <div className=' text-3xl font-semibold'>
              Mini Course Management
            </div>
          </div>
          <div className='mx-20'>
            <div className='w-full'>
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
                tagData={tags}
                onAdd={onAddCourse}
                onEdit={onEditCourse}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default App
