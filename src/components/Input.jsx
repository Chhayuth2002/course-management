import ctx from "classnames";
export const TextInput = ({
  type = "text",
  value,
  label,
  name,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={ctx("mb-4", className)}>
      <label className="block mb-2 text-sm font-medium ">{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      {error && (
        <span className=" flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export const Dropdown = ({
  label,
  data,
  name,
  onChange,
  placeHolder,
  error,
  value,
  className,
}) => {
  return (
    <div className={ctx("flex flex-col mb-4", className)}>
      <div>
        <label className=" lock mb-2 text-sm font-medium">{label}</label>
        <select
          onChange={onChange}
          name={name}
          value={value}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
      {error && (
        <span className=" flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export const TextArea = ({
  onChange,
  name,
  value,
  label,
  error,
  className,
  placeHolder,
}) => {
  return (
    <>
      <div className={ctx("mb-4", className)}>
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
      {error && (
        <span className=" flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {error}
        </span>
      )}
    </>
  );
};
