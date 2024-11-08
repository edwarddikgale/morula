import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import importedSchema from '../data/sprint-value-collab-survey.json';
import {FormSectionContainer} from 'common/components/ui/FormSectionContainer';
//import './styles/event-form.css';
import { faTextSlash } from '@fortawesome/free-solid-svg-icons';

interface Field {
  type: 'radio' | 'text' | 'textarea';
  title: string;
  name: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
}

const CustomFormRenderer: React.FC<{ schema?: Field[] }> = ({ schema }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [formSchema, setFormSchema] = useState<Field[]>(schema || importedSchema as Field[]);

    // Watch form values
    const fields = watch();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Render each field as a section within FormSectionContainer */}
        {formSchema.map((field, index) => (
          <FormSectionContainer
                key={index}
                title={field.title}
                description={`Please enter ${field.title.toLowerCase()}`}
                isHr={true} // Optional divider for separation
                icon={faTextSlash} 
                className={''}         
            >
            {/* Render based on field type */}
            <div className="form-floating mb-3">
              {field.type === 'radio' ? (
                <div className="d-flex flex-wrap">
                  {field.options?.map((option, optionIndex) => (
                    <label key={optionIndex} className="btn btn-light btn-select mx-1">
                      <input
                        type="radio"
                        value={option.value}
                        {...register(field.name, { required: field.required })}
                        checked={fields[field.name] === option.value}
                        className="d-none"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="form-floating">
                  <input
                    type={field.type}
                    id={field.name}
                    placeholder={field.title}
                    {...register(field.name, { required: field.required })}
                    className="form-control"
                  />
                  <label htmlFor={field.name}>{field.title}</label>
                  {errors[field.name] && (
                    <p className="text-danger fs-12 mb-0">
                      {`${errors[field.name]?.message} || ${field.title} is required`}
                    </p>
                  )}
                </div>
              )}
            </div>
          </FormSectionContainer>
        ))}

        <div className="text-end">
          <button type="submit" className="btn btn-primary py-2 px-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomFormRenderer;
