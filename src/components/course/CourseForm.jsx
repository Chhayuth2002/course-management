import { Dropdown, TextArea, TextInput } from '../Input'
import { Button } from '../Button'
import { FieldArray, Formik, Form, Field } from 'formik'
import { ChapterFormik } from './ChapterFormik'
import uuid from 'react-uuid'
import { CourseValidate } from '../../schemas'
import { ErrorMsg } from '../ErrorMsg'
import { X } from 'lucide-react'

const initValue = {
  name: '',
  category_id: '',
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
        {({
          values,
          handleChange,
          resetForm,
          dirty,
          errors,
          touched,
          handleBlur
        }) => {
          return (
            <Form>
              <div className=' text-xl font-semibold mb-4'>New course</div>
              {/* Couse Form */}
              <div className='flex flex-col'>
                <div className='flex flex-row w-full gap-3'>
                  <div className='flex flex-col  w-full'>
                    <Field label='Name' name='name' component={TextInput} />
                  </div>
                  <div className='flex flex-col  w-full'>
                    <Dropdown
                      data={categoryData}
                      onChange={handleChange}
                      label='Category'
                      className='w-full'
                      name='category_id'
                      value={values.category_id}
                      onBlur={handleBlur}
                      placeHolder='Select a category'
                      error={
                        errors.category_id && touched.category_id
                          ? errors.category_id
                          : null
                      }
                    />
                    <ErrorMsg name='category_id' />
                  </div>
                </div>
                <Field
                  component={TextArea}
                  label='Summarize'
                  name='summarize'
                />
                <div className='my-2 flex justify-between'>
                  <div className=' text-xl font-semibold mb-4'>Chapter</div>
                </div>
                <FieldArray name='chapters'>
                  {({ push, remove }) => (
                    <>
                      <div className='grid grid-cols-2 gap-3 '>
                        {values.chapters?.map((chapterForm, chapterIndex) => (
                          <>
                            <div className='shadow-lg rounded-md border p-5'>
                              <div className=' items-end justify-end flex'>
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
                                  label='Name'
                                  className='w-full'
                                  name={`chapters.${chapterIndex}.name`}
                                  component={TextInput}
                                />
                                <Field
                                  label='Name'
                                  className='w-full'
                                  name={`chapters.${chapterIndex}.summarize`}
                                  component={TextArea}

                                />
                               
                              </div>
                              <div className='my-2 flex justify-between mb-2'>
                                <div className=' text-xl font-semibold mb-4'>
                                  Lesson
                                </div>
                              </div>

                              <FieldArray
                                name={`chapters.${chapterIndex}.lessons`}
                              >
                                {({ push, remove }) => (
                                  <>
                                    {chapterForm.lessons.map(
                                      (lessonForm, lessonIndex) => (
                                        <div
                                          key={lessonIndex}
                                          className='gap-2 my-3'
                                        >
                                          <div className='shadow-lg rounded-md border p-2'>
                                            <div className=' items-end justify-end flex'>
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
                                                className='w-full'
                                                label='Name'
                                                name={`chapters.${chapterIndex}.lessons.${lessonIndex}.name`}
                                                component={TextInput}
                                              />
                                           
                                              <Field
                                                className='w-full'
                                                label='Content'
                                                name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content`}
                                                component={TextInput}
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
                          </>
                        ))}
                      </div>
                      <div className=' flex items-center justify-center p-2 '>
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
                  Save
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
