import React, {createElement} from 'react';
import { Formik } from 'formik';
import { FormAdapterFormProps } from '@react-final-wizard/core';

const formikAdapter = {
  Form: ({
    validationSchema,
    initialValues,
    onSubmit,
    children,
  }: FormAdapterFormProps) => {
    return (
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            {createElement(children, { currentValues: props.values, submitStep: props.handleSubmit })}
          </form>
        )}
      </Formik>
    );
  },
};

export default formikAdapter;
