import { createContext, useContext } from 'react';
import { ReactFinalWizardContextValue } from 'types';

export const ReactFinalWizardContext = createContext<
  ReactFinalWizardContextValue<any, any>
>({
  values: undefined,
  setValues() {},
  status: undefined,
  setStatus() {},
});

export const useReactFinalWizardContext = () =>
  useContext(ReactFinalWizardContext);
