const Button = ({ children, ...props }) => (
  <button
    className="w-full bg-green-600 rounded-md text-white px-3 py-2 hover:bg-green-500 cursor-pointer"
    {...props}
  >
    {children}
  </button>
);

export default Button;
