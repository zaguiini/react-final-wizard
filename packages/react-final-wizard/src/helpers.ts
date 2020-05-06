import { ReactFinalWizardStep, ReactFinalWizardValues } from './types';

export const getInitialValues = (steps: ReactFinalWizardStep<any>[]) =>
  steps.reduce<ReactFinalWizardValues>((acc, step) => {
    acc[step.id] = step.initialValues;

    return acc;
  }, {});

export const noop = () => {};
