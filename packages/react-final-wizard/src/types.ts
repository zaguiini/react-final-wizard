import { ComponentType, Dispatch, ReactNode, SetStateAction } from 'react';

export interface ReactFinalWizardStep<V = any, AV = any, S = any> {
  id: string;
  initialValues: V;
  keepValuesOnPrevious?: boolean;
  onAction(values: V, allValues: AV): S | Promise<S>;
  validationSchema: any;
}

export interface ReactFinalWizardValues {
  [key: string]: any;
}

export interface FormAdapterFormProps<T = any> {
  initialValues: any;
  validationSchema: any | (() => any);
  onSubmit(values: any): void | Promise<any>;
  children(props: { currentValues: T }): ReactNode;
}

export interface FormAdapter {
  Form: ComponentType<FormAdapterFormProps>;
}

export interface WizardAdapterContext {
  goBack(): void;
  next(): void;
}

export interface WizardAdapterStep {
  id: string;
  render: ComponentType;
}

export interface WizardAdapter {
  useContext(): WizardAdapterContext;
  Wizard: ComponentType;
  Step: ComponentType<WizardAdapterStep>;
}

export interface WrapperProps<S> {
  canGoBack: boolean;
  currentStep: string;
  isLastStep: boolean;
  status: S;
  goBack(): void;
}

export interface ReactFinalWizardProps<V, S> {
  initialStatus: S;
  onSubmit(values: V): S;
  steps: ReactFinalWizardStep<any>[];
  formAdapter: FormAdapter;
  wizardAdapter: WizardAdapter;
  Wrapper: ComponentType<WrapperProps<S>>;
}

export interface ReactFinalWizardContextValue<V, S> {
  values: V;
  status: V;
  setValues: Dispatch<SetStateAction<V>>;
  setStatus: Dispatch<SetStateAction<S>>;
}
