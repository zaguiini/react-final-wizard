import React, { ReactNode } from 'react';
import { Formik, FormikConfig } from 'formik';

type FormProps<T> = Pick<
  FormikConfig<T>,
  'validationSchema' | 'initialValues' | 'onSubmit'
> & {
  children(props: { currentValues: T }): ReactNode;
};

const formikAdapter = {
  Form: <T,>({
    validationSchema,
    initialValues,
    onSubmit,
    children,
  }: FormProps<T>) => {
    return (
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            {children({ currentValues: props.values })}
          </form>
        )}
      </Formik>
    );
  },
};

export default formikAdapter;
