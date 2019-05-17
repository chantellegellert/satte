export * from './module';

import { getStoreAccessors } from 'vuex-typescript';


import { satelliteModule, ISatelliteState } from './module';
import store, { IRootState } from '../store';

export const SatelliteNamespace = 'satellites';

// read = getter, commit = mutation, dispatch = action
const { read, commit, dispatch } = getStoreAccessors<ISatelliteState, IRootState>(SatelliteNamespace);

// getters
export const getSatteName = () => read<string>(satelliteModule.getters.getSatteName)(store);
export const getSatteZaxis = () => read<number>(satelliteModule.getters.getSatteZaxis)(store);
export const getSatteYaxis = () => read<number>(satelliteModule.getters.getSatteYaxis)(store);
export const getPlatform= () => read<string>(satelliteModule.getters.getPlatform)(store);

// mutations
export const setSatteName = (newName: string) =>
    commit<string>(satelliteModule.mutations.setSatteName)(store, newName);
export const setSatteZaxis = (zAxis: number) =>
    commit<number>(satelliteModule.mutations.setSatteZaxis)(store, zAxis);
export const setSatteYaxis = (yAxis: number) =>
    commit<number>(satelliteModule.mutations.setSatteYaxis)(store, yAxis);
export const setPlatform = (platform: string) =>
    commit<string>(satelliteModule.mutations.setPlatform)(store, platform);
