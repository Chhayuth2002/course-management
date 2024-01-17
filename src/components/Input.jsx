import ctx from 'classnames'
export const TextInput = ({
  className,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <div className={ctx('mb-2', className)}>
      <input
        {...field}
        {...props}
        className='bg-gray-50 h-10  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
      {touched[field.name] && errors[field.name] && (
        <div className='error text-xs text-rose-500 italic mt-2'>{errors[field.name]}</div>
      )}
    </div>
  )
}

// export const Dropdown = ({
//   className,
//   data,
//   field,
//   form: { touched, errors },
//   ...props
// }) => {
//   return (
//     <div className={ctx(' mb-2', className)}>
//       <select
//          {...field}
//         {...props}
//         className='bg-gray-50 border h-10 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
//       >
//         <option value=''>{placeHolder}</option>
//         {data?.map(item => (
//           <option key={item.id} value={item.id}>
//             {item.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

export const TextArea = ({
  className,
  field,
  form: { touched, errors },
  ...props
}) => {
  console.log(errors)
  return (
    <>
      <div className={ctx('mb-2', className)}>
        <textarea
          {...field}
          {...props}
          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 '
        />
         {touched[field.name] && errors[field.name] && (
        <div className='error text-xs text-rose-500 italic mt-2'>{errors[field.name]}</div>
      )}
      </div>
    </>
  )
}


import Select from "react-select";


export const SelectInput = ({
  optionsData,
   field,
  form: { touched, errors, setFieldValue },
}) => {
    const options = optionsData.map((select) => {
    return {
      ...select,
      value: select.id,
      label: select.name,
    };
  });

  const selectedValue =
    options.find((option) => option.value === field.value) || null;


  return (
    <>
     <Select
        options={options}
        name={field.name}
        value={selectedValue}
        onChange={(options) => {
          setFieldValue(field.name, options.value);
        }}
        onBlur={field.onBlur}
      ></Select>
       {touched[field.name] && errors[field.name] && (
        <div className='error text-xs text-rose-500 italic mt-2'>{errors[field.name]}</div>
      )}
    </>
  )
}
