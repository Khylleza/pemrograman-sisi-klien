const Input = ({ id, type = "text", name, ...rest }) => (
  <input
    id={id}
    name={name}
    type={type}
    className="block w-full mt-1 px-3 py-2 rounded-md border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
    {...rest}
  />
);

export default Input;
