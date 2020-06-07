import {ComponentType, Dispatch, FunctionComponent, Ref, SetStateAction} from 'react';

export interface ReactFinalWizardStep<V = any, AV = any, S = any> {
  id: string;
  initialValues: V;
  keepValuesOnPrevious?: boolean;
  component: ComponentType;
  onAction(values: V, allValues: AV): S | Promise<S>;
  validationSchema: any;
}

export interface ReactFinalWizardValues {
  [key: string]: any;
}

export interface FormAdapterFormProps<T = any> {
  initialValues: any;
  validationSchema: any | (() => any);
  onSubmit(values: T): void | Promise<any>;
  children: FunctionComponent<{ currentValues: T, submitStep(): void }>
}

export interface FormAdapter {
  Form: ComponentType<FormAdapterFormProps>;
}

export interface WizardAdapterContext {
  goBack(): void;
  next(): void;
  goToStep(step: string, strategy?: 'push' | 'replace'): void
}

export interface WizardAdapterStep {
  id: string;
  render: ComponentType;
}

export interface WizardAdapter {
  useContext(): WizardAdapterContext;
  Wizard: ComponentType<{ ref: Ref<WizardContainerRefProps> }>;
  Step: ComponentType<WizardAdapterStep>;
}

export interface WrapperProps<S> {
  canGoBack: boolean;
  currentStep: string;
  isLastStep: boolean;
  status: S;
  goBack(): void;
  goToStep(step: string): void
  submitStep(): void
}

export interface WizardContainerRefProps {
  goToStep(step: string): void
}

export interface ReactFinalWizardProps<V, S> {
  initialStep?: string
  shouldResetStepOnChange?: boolean
  initialStatus: S;
  onSubmit(values: V): S;
  steps: ReactFinalWizardStep[];
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
