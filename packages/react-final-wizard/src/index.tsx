import React, { useLayoutEffect, useMemo, useState } from 'react';
import { getInitialValues } from './helpers';
import { ReactFinalWizardContext } from './context';
import { ReactFinalWizardProps } from './types';
import { ReactFinalWizardStep } from './ReactFinalWizardStep';

const ReactFinalWizard = <V, S>({
  initialStatus,
  onSubmit,
  steps,
  formAdapter: { Form },
  wizardAdapter: { Wizard, Step, useContext },
  Wrapper,
}: ReactFinalWizardProps<V, S>) => {
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
    setValues(getInitialValues(steps));
    setStatus(initialStatus);
  }, [initialStatus, steps]);

  return (
    <ReactFinalWizardContext.Provider value={contextValue}>
      <Wizard>
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
