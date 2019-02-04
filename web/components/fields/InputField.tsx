import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldProps } from "formik";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({ field, ...props }: FieldProps & InputProps) => {
  return (
    <div>
      <input {...field} {...props} />
    </div>
  );
};
