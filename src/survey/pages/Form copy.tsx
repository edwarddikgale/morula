import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import importedSchema from '../data/sprint-value-collab-survey.json';

interface Field {
  type: 'radio' | 'text' | 'textarea';
  title: string;
  name: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
}

const CustomFormRenderer: React.FC<{ schema?: Field[] }> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formSchema, setFormSchema] = useState<Field[]>(schema || importedSchema as Field[]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Wrap each field in a FormSectionContainer component (or similar structure) */}
      {formSchema.map((field, index) => (
        <FormSectionContainer key={index}>
          <label htmlFor={field.name}>{field.title}</label>
          {field.type === 'radio' ? (
            <OptionGroup>
              {field.options?.map((option, optionIndex) => (
                <FormOption key={`${field.name}-${optionIndex}`}>
                  <input
                    type="radio"
                    id={`${field.name}-${optionIndex}`}
                    value={option.value}
                    {...register(field.name, { required: field.required })}
                  />
                  <label htmlFor={`${field.name}-${optionIndex}`}>{option.label}</label>
                </FormOption>
              ))}
            </OptionGroup>
          ) : (
            <InputField>
              <input
                type={field.type}
                id={field.name}
                {...register(field.name, { required: field.required })}
              />
            </InputField>
          )}
          {errors[field.name] && errors[field.name]?.message && (
            <ErrorMessage>{`${errors[field.name]?.message || ''}`}</ErrorMessage>
          )}
        </FormSectionContainer>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

interface ContainerProps {
    children: React.ReactNode;
}
// Define custom components for styling and structure
const FormSectionContainer:React.FC<ContainerProps> = ({ children }) => {
  // Implement your desired styling and structure for a form section
  return (
    <div className="form-section">
      {children}
    </div>
  );
};

const OptionGroup:React.FC<ContainerProps> = ({ children }) => {
  // Implement your desired styling and structure for radio options
  return (
    <div className="option-group">
      {children}
    </div>
  );
};

const FormOption:React.FC<ContainerProps> = ({ children }) => {
  // Implement your desired styling and structure for a radio option
  return (
    <div className="form-option">
      {children}
    </div>
  );
};

const InputField:React.FC<ContainerProps> = ({ children }) => {
  // Implement your desired styling and structure for a text input
  return (
    <div className="input-field">
      {children}
    </div>
  );
};

const ErrorMessage:React.FC<ContainerProps> = ({ children }) => {
  // Implement your desired styling and structure for error messages
  return (
    <span className="error-message">{children}</span>
  );
};

export default CustomFormRenderer;