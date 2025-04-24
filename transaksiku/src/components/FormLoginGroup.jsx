import Input from "./Input";
import Label from "./Label";

const FormLoginGroup = ({ label, id, type, name, ...rest }) => (
  <div className="mt-4">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} name={name} type={type} {...rest} />
  </div>
);

export default FormLoginGroup;
