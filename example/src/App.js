import './App.css'
import React from "react";
import { useField } from "formik";
import FormWizard from "@react-final-wizard/core";
import formAdapter from "@react-final-wizard/formik-adapter";
import wizardAdapter from "@react-final-wizard/react-albus-adapter";
import { boolean, object, string } from "yup";

const Wrapper = ({ status, goBack, children, isLastStep, canGoBack }) => (
  <div>
    {status && (
      <>
        <div>{status}</div>
        <hr />
      </>
    )}
    <div>
      <button type="button" onClick={goBack} disabled={!canGoBack}>
        Previous
      </button>
      <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
    </div>
    <hr />
    {children}
  </div>
);

const Field = ({ name, children, type }) => {
  const [field, meta] = useField({
    name,
    type,
  });

  return (
    <>
      <label>
        {children}
        <input {...field} type={type} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const steps = [
  {
    id: "personalInfo",
    initialValues: {
      name: "",
    },
    validationSchema: object().shape({
      name: string().required("Please insert your name"),
    }),
    component: () => <Field name="name">Personal name</Field>,
  },
  {
    id: "companyInfo",
    initialValues: {
      name: "",
    },
    component: () => <Field name="name">Company name</Field>
  },
  {
    id: "tosAgreement",
    keepValuesOnPrevious: true,
    initialValues: {
      agreed: false,
    },
    validationSchema: object().shape({
      agreed: boolean().test(
        "is-true",
        "You must accept the agreement",
        (v) => v
      ),
    }),
    component: () => (
      <Field name="agreed" type="checkbox">
        I accept the Terms of Service
      </Field>
    ),
  },
];

const App = () => {
  return (
    <FormWizard
      steps={steps}
      formAdapter={formAdapter}
      initialStep="companyInfo"
      wizardAdapter={wizardAdapter}
      Wrapper={Wrapper}
      onSubmit={(values) => {
        console.log(values);
        return "Thanks for submitting!";
      }}
    />
  );
};

export default App;
