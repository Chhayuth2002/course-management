import { Button } from '../Button'
import { FieldArray, Formik, Form, Field } from 'formik'
import uuid from 'react-uuid'
import { CourseValidate } from '../../schemas'
import { TextAreaField, TextInputField, ReactSelect } from '../InputField'
import { X } from 'lucide-react'

const initValue = {
  name: '',
  category_id: [],
  summarize: '',
  chapters: [
    {
      id: uuid(),
      name: '',
      summarize: '',
      lessons: [
        {
          id: uuid(),
          name: '',
          content: ''
        }
      ]
    }
  ]
}

export const CourseForm = ({
  categoryData,
  onAdd,
  onEdit,
  selectedItem,
  setSelectedItem
}) => {
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
        {({ values, resetForm, dirty }) => {
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
                      isMulti={true}
                    />
                  </div>
                </div>
                <Field
                  name='summarize'
                  component={TextAreaField}
                  placeholder='Course summarize'
                />
                <div className='mt-4 mb-2 flex justify-between'>
                  <div className='text-xl font-semibold'>Chapter</div>
                </div>

                {/* Chapte form */}
                <FieldArray name='chapters'>
                  {({ push, remove }) => (
                    <>
                      <div className='grid grid-cols-2 gap-3 '>
                        {values.chapters?.map((chapterForm, chapterIndex) => (
                          <div
                            key={chapterForm.id}
                            className='shadow-lg rounded-md border p-3'
                          >
                            <div className=' items-end justify-end flex mb-2'>
                              <Button
                                onClick={() => remove(chapterIndex)}
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
                                name={`chapters.${chapterIndex}.summarize`}
                                placeholder='Chapter Summarize'
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
                                  {chapterForm.lessons.map(
                                    (lessonForm, lessonIndex) => (
                                      <div
                                        key={lessonForm.id}
                                        className='gap-2 my-3'
                                      >
                                        <div className='shadow-lg rounded-md border p-2'>
                                          <div className=' items-end justify-end flex mb-2'>
                                            <Button
                                              onClick={() =>
                                                remove(lessonIndex)
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
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                  <div className='flex items-center justify-center'>
                                    <Button
                                      onClick={() =>
                                        push({
                                          id: uuid(),
                                          name: '',
                                          content: ''
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
                              id: uuid(),
                              name: '',
                              summarize: '',
                              lessons: [{ id: uuid(), name: '', content: '' }]
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
                <Button onClick={() => resetForm()}>Reset</Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
