import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { Step, Steps, withWizard, Wizard, WizardContext } from 'react-albus';

const WizardContext = createContext<WizardContext | undefined>(undefined);

const consumeContext = useContext;

const wizardAdapter = {
  Wizard: (props: { children?: ReactNode }) => {
    return (
      <Wizard>
        <Steps>{props.children}</Steps>
      </Wizard>
    );
  },
  Step: withWizard<{ id: string }>(props => {
    const value = useMemo(
      () => ({
        ...props.wizard,
        goBack: props.wizard.previous,
      }),
      [props.wizard]
    );

    return (
      <WizardContext.Provider value={value}>
        <Step {...props} />
      </WizardContext.Provider>
    );
  }),
  useContext: (): WizardContext => {
    const value = consumeContext(WizardContext);

    if (!value) {
      throw new Error('No context');
    }

    return value;
  },
};

export default wizardAdapter;
