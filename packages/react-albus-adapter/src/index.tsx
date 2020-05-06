import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { Step, Steps, withWizard, Wizard } from 'react-albus';
import {
  WizardAdapter,
  WizardAdapterContext,
  WizardAdapterStep,
} from '@react-final-wizard/core';

const WizardContext = createContext<WizardAdapterContext | undefined>(
  undefined
);

const wizardAdapter: WizardAdapter = {
  Wizard: (props: { children?: ReactNode }) => {
    return (
      <Wizard>
        <Steps>{props.children}</Steps>
      </Wizard>
    );
  },
  Step: withWizard<WizardAdapterStep>(props => {
    const value = useMemo(
      () => ({
        ...props.wizard,
        goBack: props.wizard.previous,
      }),
      [props.wizard]
    );

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
