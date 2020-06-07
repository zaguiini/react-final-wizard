import React, {createContext, forwardRef, useContext, useImperativeHandle, useMemo, useRef} from 'react';
import {Step, Steps, withWizard, Wizard, WizardContext} from 'react-albus';
import {
  WizardAdapter,
  WizardAdapterContext,
  WizardAdapterStep,
} from '@react-final-wizard/core';

const WizardContext = createContext<WizardAdapterContext | undefined>(
  undefined
);

const noop = () => {}

const wizardAdapter: WizardAdapter = {
  Wizard: forwardRef((props, ref) => {
    const wizardRef = useRef<WizardContext | null>(null)

    useImperativeHandle(ref, () => ({
      goToStep: wizardRef.current?.replace ?? noop,
    }))

    return (
      <Wizard>
        {(wizard: WizardContext) => {
          wizardRef.current = wizard

          return (
              <Steps>{props.children}</Steps>
          )
        }}
      </Wizard>
    );
  }),
  Step: withWizard<WizardAdapterStep>(props => {
    const value = useMemo(
      () => ({
        ...props.wizard,
        goBack: props.wizard.previous,
        goToStep: (step: string, strategy: 'push' | 'replace' = 'replace') => props.wizard[strategy](step)
      }),
      [props.wizard]
    );

    // TODO: Fix this
    // @ts-ignore
    const step = <Step {...props} />;

    return (
      <WizardContext.Provider value={value}>{step}</WizardContext.Provider>
    );
  }),
  useContext: () => {
    const value = useContext(WizardContext);

    if (!value) {
      throw new Error('No context');
    }

    return value;
  },
};

export default wizardAdapter;
