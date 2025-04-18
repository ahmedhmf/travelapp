import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed} from "@angular/core";

export type TripData = {
  destination: string;
  startDate: string;
  endDate: string;
  adults: number;
  elders: number;
  children: number;
  childAges: number[];
  interests: string[];
  tripStyle: string;
  notes: string;
}

export const initialState: TripData = {
  destination: '',
  startDate: '',
  endDate: '',
  adults: 2,
  elders: 0,
  children: 0,
  childAges: [],
  interests: [],
  tripStyle: 'Balanced',
  notes: ''
};

export const tripDetailStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store) => ({
    updateDestination(destination: string): void {
      patchState(store, (state) => ({destination}));
    },
    updateStartDate(startDate: string): void {
      patchState(store, (state) => ({startDate}));
    },
    updateEndDate(endDate: string): void {
      patchState(store, (state) => ({endDate}));
    },
    updateAdults(adults: number): void {
      patchState(store, (state) => ({adults}));
    },
    updateElders(elders: number): void {
      patchState(store, (state) => ({elders}));
    },
    updateChildren(children: number): void {
      patchState(store, (state) => ({children}));
    },
    updateChildAges(childAges: number[]): void {
      patchState(store, (state) => ({childAges}));
    },
    updateInterests(interests: string[]): void {
      patchState(store, (state) => ({interests}));
    },
    updateTripStyle(tripStyle: string): void {
      patchState(store, (state) => ({tripStyle}));
    },
    updateNotes(notes: string): void {
      patchState(store, (state) => ({notes}));
    },
    resetTripData(): void {
      patchState(store, () => initialState);
    },
  })),
  withComputed((store) => ({
    tripData: computed(() => (store.adults(), store.elders(), store.children(), store.childAges(), store.interests(), store.tripStyle(), store.notes(), store.destination(), store.startDate(), store.endDate())),
  }))
);
