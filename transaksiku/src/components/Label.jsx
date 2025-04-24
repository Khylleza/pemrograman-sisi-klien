const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block font-medium text-sm text-gray-700 mb-0.5"
  >
    {children}
  </label>
);

export default Label;
