import Label from "../atoms/Label";
import Input from "../atoms/Input";

const FormLoginGroup = ({ label, id, type, name, ...rest }) => (
  <div className="mt-4">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} name={name} type={type} {...rest} />
  </div>
);

export default FormLoginGroup;
