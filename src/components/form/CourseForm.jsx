import { Button } from '../Button'
import { FieldArray, Formik, Form, Field } from 'formik'
import { CourseValidate } from '../../schemas'
import {
  TextAreaField,
  TextInputField,
  ReactSelect,
  MultiSelect,
  UploadFile
} from '../InputField'
import { X } from 'lucide-react'
const initValue = {
  name: '',
  category_id: '',
  image_url: '',
  summary: '',
  tags: [],
  removeTag: [],
  chapters: [
    {
      name: '',
      summary: '',
      lessons: [
        {
          name: '',
          content: '',
          image_url: ''
        }
      ]
    }
  ]
}

export const CourseForm = ({
  categoryData,
  tagData,
  onAdd,
  onEdit,
  selectedItem,
  setSelectedItem
}) => {
  const onRemoveChapter = (setValues, chapterIndex) => {
    setValues(prev => {
      const updatedChapters = prev.chapters.map((chapter, index) =>
        index === chapterIndex ? { ...chapter, _delete: true } : chapter
      )
      return {
        ...prev,
        chapters: updatedChapters
      }
    })
  }

  const onRemoveLesson = (setValues, chapterIndex, lessonIndex) => {
    setValues(prev => {
      const updatedChapters = prev.chapters.map((chapter, cIndex) => {
        if (cIndex === chapterIndex) {
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson, lIndex) => {
              if (lIndex === lessonIndex) {
                return {
                  ...lesson,
                  _delete: true
                }
              } else {
                return lesson
              }
            })
          }
        } else {
          return chapter
        }
      })
      return {
        ...prev,
        chapters: updatedChapters
      }
    })
  }

  return (
    <div className='shadow-xl bg-white p-3 mb-20 rounded-md '>
      <Formik
        enableReinitialize={true}
        initialValues={!selectedItem.id ? initValue : selectedItem}
        onSubmit={(values, actions) => {
          if (selectedItem.id) {
            onEdit(values)
            setSelectedItem({})
          } else {
            onAdd(values)
          }
          actions.resetForm()
        }}
        validationSchema={CourseValidate}
      >
        {({ values, dirty, resetForm, setValues }) => {
          return (
            <Form>
              <div className=' text-xl font-semibold mb-4'>New course</div>

              {/* Couse Form */}
              <div className='flex flex-col'>
                <div className='flex flex-row w-full gap-3'>
                  <div className='flex flex-col  w-full'>
                    <Field
                      name='name'
                      component={TextInputField}
                      placeholder='Course name'
                    />
                  </div>
                  <div className='flex flex-col  w-full'>
                    <Field
                      name='category_id'
                      component={ReactSelect}
                      options={categoryData}
                      defaultValue={selectedItem.category_id}
                    />
                  </div>
                </div>
                <Field name='tags' component={MultiSelect} options={tagData} />
                <Field
                  name='summary'
                  component={TextAreaField}
                  placeholder='Course summary'
                />
                <Field name='image_url' component={UploadFile} />
                <div className='mt-4 mb-2 flex justify-between'>
                  <div className='text-xl font-semibold'>Chapter</div>
                </div>

                {/* Chapte form */}
                <FieldArray name='chapters'>
                  {({ push, remove }) => (
                    <>
                      <div className='grid grid-cols-2 gap-3 '>
                        {values.chapters
                          .filter(chapterForm => !chapterForm._delete)
                          .map((chapterForm, chapterIndex) => (
                            <div
                              key={chapterIndex}
                              className='shadow-lg rounded-md border p-3'
                            >
                              <div className=' items-end justify-end flex mb-2'>
                                <Button
                                  onClick={() =>
                                    selectedItem.id
                                      ? onRemoveChapter(setValues, chapterIndex)
                                      : remove(chapterIndex)
                                  }
                                  variant='icon'
                                  type='button'
                                >
                                  <X />
                                </Button>
                              </div>
                              <div className=' gap-10'>
                                <Field
                                  name={`chapters.${chapterIndex}.name`}
                                  placeholder='Chapter name'
                                  component={TextInputField}
                                />
                                <Field
                                  name={`chapters.${chapterIndex}.summary`}
                                  placeholder='Chapter summary'
                                  component={TextAreaField}
                                />
                              </div>
                              <div className='mt-4 mb-2 flex justify-between '>
                                <div className=' text-xl font-semibold'>
                                  Lesson
                                </div>
                              </div>

                              {/* Lesson Form */}
                              <FieldArray
                                name={`chapters.${chapterIndex}.lessons`}
                              >
                                {({ push, remove }) => (
                                  <>
                                    {chapterForm.lessons
                                      .filter(lesson => !lesson._delete)
                                      .map((lessonForm, lessonIndex) => (
                                        <div
                                          key={lessonIndex}
                                          className='gap-2 my-3'
                                        >
                                          <div className='shadow-lg rounded-md border p-2'>
                                            <div className=' items-end justify-end flex mb-2'>
                                              <Button
                                                onClick={() =>
                                                  selectedItem.id
                                                    ? onRemoveLesson(
                                                        setValues,
                                                        chapterIndex,
                                                        lessonIndex
                                                      )
                                                    : remove(lessonIndex)
                                                }
                                                variant='icon'
                                              >
                                                <X />
                                              </Button>
                                            </div>
                                            <div className=' gap-2'>
                                              <Field
                                                name={`chapters.${chapterIndex}.lessons.${lessonIndex}.name`}
                                                placeholder='Lesson name'
                                                component={TextInputField}
                                              />
                                              <Field
                                                name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content`}
                                                placeholder='Lesson content'
                                                component={TextAreaField}
                                              />
                                              <Field
                                                name={`chapters.${chapterIndex}.lessons.${lessonIndex}.image_url`}
                                                component={UploadFile}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    <div className='flex items-center justify-center'>
                                      <Button
                                        onClick={() =>
                                          push({
                                            name: '',
                                            content: '',
                                            image_url: ''
                                          })
                                        }
                                      >
                                        Add new lesson
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </FieldArray>
                            </div>
                          ))}
                      </div>
                      <div className='flex items-center justify-center p-2 '>
                        <Button
                          type='button'
                          onClick={() =>
                            push({
                              name: '',
                              summary: '',
                              lessons: [
                                {
                                  name: '',
                                  content: '',
                                  image_url: ''
                                }
                              ]
                            })
                          }
                        >
                          Add new chapter
                        </Button>
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
              <div className='my-2 gap-5'>
                <Button className='mr-2' type='submit' isDisable={!dirty}>
                  {!selectedItem.id ? 'Save' : 'Update'}
                </Button>
                <Button onClick={() => resetForm()} className='mr-2'>
                  {!selectedItem.id ? 'Reset' : 'Reset to original'}
                </Button>
                {selectedItem.id && (
                  <Button onClick={() => setSelectedItem({})}>
                    Clear edit
                  </Button>
                )}
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
