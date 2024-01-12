import ctx from "classnames";
export const TextInput = ({
  type = "text",
  value,
  label,
  name,
  onChange,
  className,
  onBlur,
}) => {
  return (
    <div className={ctx("mb-2", className)}>
      <label className="block mb-2 text-sm font-medium ">{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        onBlur={onBlur}
        className="bg-gray-50 h-10  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export const Dropdown = ({
  label,
  data,
  name,
  onChange,
  placeHolder,
  value,
  className,
}) => {
  return (
    <div className={ctx(" mb-2", className)}>
      <label className=" block mb-2 text-sm font-medium">{label}</label>
      <select
        onChange={onChange}
        name={name}
        value={value}
        className="bg-gray-50 border h-10 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      >
        {data?.length > 0 ? (
          <>
            <option value="">{placeHolder}</option>
            {data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </>
        ) : (
          <option value="">No {label}</option>
        )}
      </select>
    </div>
  );
};

export const TextArea = ({
  onChange,
  name,
  value,
  label,
  className,
  placeHolder,
}) => {
  return (
    <>
      <div className={ctx("mb-2", className)}>
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <textarea
          onChange={onChange}
          rows="4"
          name={name}
          value={value}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
          placeholder={placeHolder}
        ></textarea>
      </div>
    </>
  );
};
