"use client"
import React from 'react';

import { InputText } from 'primereact/inputtext';

import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';

export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="fw-bolder h5" htmlFor={props.id || props.name}>{label}</label>
      <InputText className="w-100 py-2 rounded-pill" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MyCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <div className="d-flex align-items-center">
        <Checkbox  {...field} {...props}/>
        <label htmlFor="ingredient1" className="ms-2"> 
          {label} </label>
      </div>
      <div className=''>
        {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>) : null}
      </div>

    </>
  );
};

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };



export const MyInputRadio = ({ label, ...props }) => {
  
  const [field, meta] = useField({ ...props, type: 'radio' });
  return (

    <div className="d-flex align-items-center">
      <RadioButton  {...field} {...props}/>
      <label htmlFor="ingredient1" className="ms-2"> 
        {label} </label>
      {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>) : null}
    </div>

  );
};
