const Button = ({ children, ...props }) => (
  <button
    className="w-full bg-blue-600 rounded-md text-white px-3 py-2 hover:bg-blue-500 cursor-pointer"
    {...props}
  >
    {children}
  </button>
);

export default Button;
