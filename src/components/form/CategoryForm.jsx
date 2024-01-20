import { X } from 'lucide-react'
import { Button } from '../Button'
import { Field, Form, Formik } from 'formik'
import { CategoryValidate } from '../../schemas'
import { TextInputField } from '../InputField'

export const CategoryForm = ({
  setIsShowModal,
  handleAdd,
  value,
  handleEdit
}) => {
  const onCloseForm = () => {
    setIsShowModal(false)
    // resetForm()
  }

  return (
    <div className=' bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex'>
      <div className='relative p-4  w-2/4  h-full md:h-auto'>
        <div className='relative bg-white rounded-lg shadow'>
          <Button
            onClick={onCloseForm}
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
            variant='icon'
          >
            <X />
          </Button>
          <Formik
            initialValues={{
              name: value?.name || '',
              code: value?.code || '',
              id: value?.id
            }}
            validationSchema={CategoryValidate}
            onSubmit={(values, actions) => {
              if (value.id) {
                handleEdit(values)
              } else {
                handleAdd(values)
              }
              setIsShowModal(false)
              actions.resetForm()
            }}
          >
            {({ resetForm, dirty }) => {
              return (
                <div className='flex flex-col p-5'>
                  <div className='w-full flex justify-between py-4'>
                    <div className='mb-2 text-3xl text-center font-semibold  '>
                      {value.id ? 'Edit: ' + value.name : 'Create category'}
                    </div>
                  </div>
                  <Form>
                    <div className=' flex flex-col gap-y-2'>
                      <Field
                        name='name'
                        placeholder='Category name'
                        component={TextInputField}
                      />
                      <Field
                        placeholder='Category code'
                        name='code'
                        component={TextInputField}
                      />
                      <div>
                        <Button
                          className='mr-2'
                          type='submit'
                          isDisable={!dirty}
                        >
                          {!value.id ? 'Save' : 'Update'}
                        </Button>
                        <Button type='button' onClick={() => resetForm()}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}
