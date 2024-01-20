export const TextInputField = props => {
  const {
    field,
    form: { touched, errors },
    ...restProps
  } = props

  return (
    <>
      <input
        type='text'
        {...field}
        {...restProps}
        className='bg-gray-50 w-full h-10 border border-gray-300 text-sm rounded-lg p-2.5 '
      />
      {touched[field.name] && errors[field.name] && (
        <div className='error mt-2 text-sm text-rose-500 italic'>
          {errors[field.name]}
        </div>
      )}
    </>
  )
}

export const SelectField = props => {
  const {
    data,
    field,
    form: { touched, errors },
    ...restProps
  } = props

  return (
    <>
      <select
        {...field}
        {...restProps}
        className='bg-gray-50 border h-10 border-gray-300 text-sm rounded-lg p-2.5 '
      >
        <option value=''>Select category</option>
        {data?.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {touched[field.name] && errors[field.name] && (
        <div className='error mt-2 text-sm text-rose-500 italic'>
          {errors[field.name]}
        </div>
      )}
    </>
  )
}

export const TextAreaField = props => {
  const {
    field,
    form: { touched, errors },
    ...restProps
  } = props

  return (
    <div className='mt-4'>
      <textarea
        {...field}
        {...restProps}
        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 h-40 '
      ></textarea>
      {touched[field.name] && errors[field.name] && (
        <div className='error mt-2 text-sm text-rose-500 italic'>
          {errors[field.name]}
        </div>
      )}
    </div>
  )
}

import axios from 'axios'
import { X } from 'lucide-react'
import { useState } from 'react'
import Select from 'react-select'

export const ReactSelect = ({
  defaultValue,
  field,
  options,
  form: { touched, errors, setValues }
}) => {
  const handleChange = option => {
    setValues(prev => {
      return {
        ...prev,
        [field.name]: option.value
      }
    })
  }

  const mapOption = options.map(option => ({
    value: option.id,
    label: option.name
  }))

  const selectedItem = options
    .filter(option => option.id === field.value)
    .map(option => ({ value: option.id, label: option.name }))[0]

  const defaultV = options
    .filter(option => option.id === +defaultValue)
    .map(option => ({
      value: option.id ? option.id : option.value,
      label: option.name ? option.name : option.value
    }))[0]

  return (
    <>
      <Select
        {...field}
        defaultValue={+defaultValue ? defaultV : ''}
        options={mapOption}
        value={selectedItem}
        onChange={handleChange}
        placeholder={field.placeholder}
        noOptionsMessage={() => 'No Category'}
      />
      {touched[field.name] && errors[field.name] && (
        <div className='error mt-2 text-sm text-rose-500 italic'>
          {errors[field.name]}
        </div>
      )}
    </>
  )
}

import CreatableSelect from 'react-select/creatable'
import { Button } from './Button'

export const MultiSelect = ({
  field,
  options,
  form: { touched, errors, setValues }
}) => {
  const handleChange = (options, context) => {
    setValues(prev => {
      if (context.action === 'remove-value') {
        return {
          ...prev,
          [field.name]: options,
          removeTag: [...prev.removeTag, { id: context.removedValue.value }]
        }
      }
      return {
        ...prev,
        [field.name]: options
      }
    })
  }

  const mappedValue = field.value.map(item => ({
    value: item?.id ? item.id : item.value,
    label: item?.name ? item.name : item.label,
    __isNew__: item?.__isNew__ || false
  }))

  return (
    <div className='mt-3'>
      <CreatableSelect
        {...field}
        options={options.map(option => ({
          value: option.id,
          label: option.name
        }))}
        value={mappedValue}
        placeholder={field.placeholder}
        onChange={handleChange}
        noOptionsMessage={() => 'No tag'}
        isMulti={true}
      />
      {touched[field.name] && errors[field.name] && (
        <div className='error mt-2 text-sm text-rose-500 italic'>
          {errors[field.name]}
        </div>
      )}
    </div>
  )
}

export const ImageUpload = props => {
  const {
    field,
    form: { setFieldValue }
    // ...restProps
  } = props

  const [selectedFile, setSelectedFile] = useState(null)
  const [isDisable, setIsDisable] = useState(false)

  const handleFileUpload = event => {
    setSelectedFile(event.target.files[0])
    setIsDisable(true)
  }

  const handleUpload = async event => {
    setIsDisable(false)
    event.preventDefault()
    const formData = new FormData()
    formData.append('url', selectedFile)

    await axios
      .post('http://locahost:5000/api/v1/upload', formData)
      .then(response => {
        setFieldValue(field.name, response.data.url)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='mt-2 w-full'>
      <div className=' flex items-center justify-center'>
        {field.value && (
          <img
            className='object-cover my-2 h-40 rounded-md'
            src={field.value}
            alt=''
          />
        )}
      </div>
      <div className='flex flex-row'>
        <input
          type='file'
          accept='image/*'
          name={field.name}
          // {...field}
          className='block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100'
          onChange={handleFileUpload}
        />
        <Button isDisable={!isDisable} onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  )
}

export const UploadFile = props => {
  const {
    field,
    form: { setFieldValue }
  } = props

  const handleFileChange = e => {
    setFieldValue(field.name, e.target.files[0])
  }

  // console.log(image)
  return (
    <div className='mt-2 w-full'>
      <div className=' flex items-center justify-center'>
        {field.value && (
          <>
            <img
              className='object-cover my-2 h-40 rounded-md'
              src={field.value}
            />
          </>
        )}
      </div>
      <div className='flex flex-row'>
        <input
          type='file'
          accept='image/*'
          name={field.name}
          onChange={handleFileChange}
          className='block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-neutral-100
            hover:file:bg-neutral-300'
        />
        {field.value && (
          <div onClick={() => setFieldValue(field.name)}>
            <X />
          </div>
        )}
        {/* <Button isDisable={!isDisable} onClick={handleUpload}>
          Upload
        </Button> */}
      </div>
    </div>
  )
}
