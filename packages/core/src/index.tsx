import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';

import { getInitialValues } from './helpers';
import { ReactFinalWizardContext } from './context';
import {ReactFinalWizardProps, WizardContainerRefProps} from './types';
import { ReactFinalWizardStep } from './ReactFinalWizardStep';

const ReactFinalWizard = <V, S>({
  initialStep,
  initialStatus,
    shouldResetStepOnChange,
  onSubmit,
  steps,
  formAdapter: { Form },
  wizardAdapter: { Wizard, Step, useContext },
  Wrapper,
}: ReactFinalWizardProps<V, S>) => {
    const wizardRef = useRef<WizardContainerRefProps | null>(null)
    const isInitialRender = useRef(true)
  const [values, setValues] = useState(() => getInitialValues(steps));
  const [status, setStatus] = useState(initialStatus);

  const contextValue = useMemo(
    () => ({
      values,
      status,
      setValues,
      setStatus,
    }),
    [values, status]
  );

  useLayoutEffect(() => {
      if(!wizardRef.current || !initialStep || !isInitialRender.current) {
          return
      }

      isInitialRender.current = false

      wizardRef.current.goToStep(initialStep)
  }, [initialStep])

  useLayoutEffect(() => {
      if(!wizardRef.current || !initialStep || !steps.length || !shouldResetStepOnChange || isInitialRender.current) {
          return
      }

      wizardRef.current.goToStep(initialStep)
  }, [initialStep, steps])

  useLayoutEffect(() => {
    setValues(getInitialValues(steps));
    setStatus(initialStatus);
  }, [initialStatus, steps]);

  return (
    <ReactFinalWizardContext.Provider value={contextValue}>
      <Wizard ref={wizardRef}>
        {steps.map(step => (
          <Step
            key={step.id}
            id={step.id}
            render={() => (
              <ReactFinalWizardStep
                steps={steps}
                {...step}
                Form={Form}
                Wrapper={Wrapper}
                useContext={useContext}
                onSubmit={onSubmit}
              />
            )}
          />
        ))}
      </Wizard>
    </ReactFinalWizardContext.Provider>
  );
};

export default ReactFinalWizard;
export { useReactFinalWizardContext } from './context';
export * from './types';
