import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed} from "@angular/core";
import {RecommendedPlace} from "../model/recommended-place.model";

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
  recommendedPlace: RecommendedPlace[] | undefined
  selectedPlaces: string[];
}

export const initialState: TripData = {
  destination: 'London',
  startDate: '4/15/2025',
  endDate:  '4/16/2025',
  adults: 2,
  elders: 0,
  children: 0,
  childAges: [],
  tripStyle: 'Balanced',
  interests: [],
  notes: '',
  recommendedPlace: undefined,
  selectedPlaces: []
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
    updateRecommendedPlace(recommendedPlace: RecommendedPlace[]): void {
      patchState(store, (state) => ({recommendedPlace}));
    },
    updateSelectedPlaces(selectedPlaces: string[]): void {
      patchState(store, (state) => ({selectedPlaces}));
    },
    resetTripData(): void {
      patchState(store, () => initialState);
    },
  })),
);
