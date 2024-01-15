export const TextInputField = (props) => {
  const {
    field,
    form: { touched, errors },
    ...restProps
  } = props;

  return (
    <>
      <input
        type="text"
        {...field}
        {...restProps}
        className="bg-gray-50 w-full h-10 border border-gray-300 text-sm rounded-lg p-2.5 "
      />
      {touched[field.name] && errors[field.name] && (
        <div className="error mt-2 text-sm text-rose-500 italic">
          {errors[field.name]}
        </div>
      )}
    </>
  );
};

export const SelectField = (props) => {
  const {
    data,
    field,
    form: { touched, errors },
    ...restProps
  } = props;

  return (
    <>
      <select
        {...field}
        {...restProps}
        className="bg-gray-50 border h-10 border-gray-300 text-sm rounded-lg p-2.5 "
      >
        <option value="">Select category</option>
        {data?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {touched[field.name] && errors[field.name] && (
        <div className="error mt-2 text-sm text-rose-500 italic">
          {errors[field.name]}
        </div>
      )}
    </>
  );
};

export const TextAreaField = (props) => {
  const {
    field,
    form: { touched, errors },
    ...restProps
  } = props;

  return (
    <div className="mt-4">
      <textarea
        {...field}
        {...restProps}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 h-40 "
      ></textarea>
      {touched[field.name] && errors[field.name] && (
        <div className="error mt-2 text-sm text-rose-500 italic">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

import Select from "react-select";

export const ReactSelect = ({
  field,
  options,
  isMulti = false,
  form: { touched, errors, setValues },
}) => {
  const handleChange = (option) => {
    setValues((prev) => {
      return {
        ...prev,
        category_id: isMulti
          ? [...prev.category_id, option.map((item) => item.value)]
          : option.value,
      };

    });
  };

  let selectedItem =  options.find((option) => option.value === field.value);
    // ? options.filter((option) => field.value.indexOf(option.value) >= 0)
    // :

  return (
    <>
      <Select
        {...field}
        options={options.map((option) => ({
          value: option.id,
          label: `${option.name} - ${option.code}`,
        }))}
        value={selectedItem}
        onChange={handleChange}
        isMulti={isMulti}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="error mt-2 text-sm text-rose-500 italic">
          {errors[field.name]}
        </div>
      )}
    </>
  );
};
