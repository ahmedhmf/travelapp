import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {StepperItem} from "../model/stepper-item.model";
import {computed} from "@angular/core";

export type WizardData = {
  steps: StepperItem[];
  page: number;
}

const initialState: WizardData = {
  steps: [{
    active: true,
    completed: false,
    icon: 'location',
  },
    {
      active: false,
      completed: false,
      icon: 'calendar',
    },
    {
      active: false,
      completed: false,
      icon: 'family',
    },
    {
      active: false,
      completed: false,
      icon: 'vacation',
    },
    {
      active: false,
      completed: false,
      icon: 'rocket',
    },
    {
      active: false,
      completed: false,
      icon: 'edit',
    },
  ],
  page: 0
}
export const wizardStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store) => ({
    nextPage(): void {
      const steps = [...store.steps()];
      steps[store.page()].active = false;
      steps[store.page()].completed = true;
      steps[store.page() + 1].active = true;
      patchState(store, {page: store.page() + 1, steps: steps});
    },
    prevPage(): void {
      const steps = [...store.steps()];
      steps[store.page()].active = false;
      steps[store.page()].completed = false;
      steps[store.page() - 1].active = true;
      steps[store.page() - 1].completed = false;
      patchState(store, {page: store.page() - 1});
    },
  })),
  withComputed((state) => ({
    nextButtonDisabled: computed(() => state.page() === state.steps().length - 1),
    prevButtonDisabled: computed(() => state.page() <= 0)
  }))
);
