import ctx from "classnames";

export const Button = ({
  children,
  isDisable,
  className,
  onClick,
  type = "button",
  variant = "default",
}) => {
  let baseStyle;

  switch (variant) {
    case "icon":
      baseStyle = "hover:underline";
      break;
    case "default":
      baseStyle =
        "bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400";
      break;
    default:
      break;
  }

  return (
    <button
      type={type}
      disabled={isDisable}
      onClick={onClick}
      className={ctx(baseStyle, className)}
    >
      {children}
    </button>
  );
};
