import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
// configure Vue to use Vuex module
Vue.use(Vuex);

import { SatelliteNamespace, ISatelliteState, satelliteModule } from './satellite';

const defaultState: IRootState = { };
export interface IRootState {
    [SatelliteNamespace]?: ISatelliteState;
}

// configure vuex store
const storeOptions: StoreOptions<IRootState> = {
    state: {
        ...defaultState,
    },
    modules: {
        [SatelliteNamespace]: satelliteModule,
    }
};

const store = new Vuex.Store<IRootState>(storeOptions);

// export vuex singleton store
export default store;
