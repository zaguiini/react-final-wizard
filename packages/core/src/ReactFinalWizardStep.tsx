import React, { ComponentType, createElement, useMemo } from 'react';
import produce from 'immer';

import { noop } from './helpers';
import { useReactFinalWizardContext } from './context';
import {
  FormAdapter,
  ReactFinalWizardProps,
  ReactFinalWizardStep as IReactFinalWizardStep,
  WizardAdapter,
} from './types';

type ReactFinalWizardStepProps = IReactFinalWizardStep &
  Pick<ReactFinalWizardProps<any, any>, 'steps' | 'Wrapper' | 'onSubmit'> &
  Pick<FormAdapter, 'Form'> &
  Pick<WizardAdapter, 'useContext'> & {
    component: ComponentType;
  };

export const ReactFinalWizardStep = ({
  id,
  keepValuesOnPrevious,
  steps,
  onAction = noop,
  component,
  Form,
  Wrapper,
  useContext,
  onSubmit,
  validationSchema,
}: ReactFinalWizardStepProps) => {
  const { values, status, setValues, setStatus } = useReactFinalWizardContext();
  const wizard = useContext();

  const info = useMemo(
    () => ({
      stepNumber: steps.findIndex((step) => step.id === id),
      canGoBack: steps[0].id !== id,
      currentStep: id,
      isLastStep: steps[steps.length - 1].id === id,
    }),
    [steps, id]
  );

  const handleSubmit = async (sectionValues: any) => {
    setStatus(undefined);
    let newStatus;
    const newValues = produce(values, (draft: any) => {
      draft[info.currentStep] = sectionValues;
    });

    setValues(newValues);

    try {
      if (info.isLastStep) {
        newStatus = await onSubmit(newValues);
      } else {
        newStatus = await onAction(sectionValues, newValues);
        wizard.next();
      }
    } catch (e) {
      newStatus = e;
    }

    setStatus(newStatus);
  };

  const goBack = (currentValues: any) => () => {
    if (!info.canGoBack) {
      return;
    }

    setStatus(undefined);

    if (keepValuesOnPrevious) {
      const newValues = produce(values, (draft: any) => {
        draft[id] = currentValues;
      });

      setValues(newValues);
    }

    wizard.goToStep(steps[info.stepNumber - 1].id);
  };

  const goToStep = (step: string) => {
    setStatus(undefined)
    wizard.goToStep(step)
  }

  return (
    <Form
      validationSchema={validationSchema}
      initialValues={values[id]}
      onSubmit={handleSubmit}
    >
      {({ currentValues, submitStep }) => (
        <Wrapper {...info} status={status} goBack={goBack(currentValues)} goToStep={goToStep} submitStep={submitStep}>
          {createElement(component)}
        </Wrapper>
      )}
    </Form>
  );
};
