export interface ISatelliteState {
    name: string;
    zAxis: number;
    yAxis: number;
    platform: string;
}

const defaultState: ISatelliteState = {
    name: '',
    zAxis: 0,
    yAxis: 0,
    platform: ''
};

// configure grid module
export const satelliteModule = {
    namespaced: true,
    state: { ...defaultState },
    getters: {
        getSatteName: (state: ISatelliteState): string => {
            console.log("Store module: getSatteName: returned value: ", state.name);
            return state.name;
        },
        getSatteZaxis: (state: ISatelliteState): number => {
            console.log("Store module: getSatteZaxis: returned value: ", state.zAxis);
            return state.zAxis;
        },
        getSatteYaxis: (state: ISatelliteState): number => {
            console.log("Store module: getSatteYaxis: returned value: ", state.yAxis);
            return state.yAxis;
        },
        getPlatform: (state: ISatelliteState): string => {
            console.log("Store module: getPlatform: returned value: ", state.platform);
            return state.platform;
        },
    },
    mutations: {
        setSatteName: (state: ISatelliteState, newName: string) => {
            console.log("Store module: setSatteName: set newName: ", newName);
            state.name = newName;
        },
        setSatteZaxis: (state: ISatelliteState, zAxis: number) => {
            console.log("Store module: setSatteZaxis: set zAxis: ", zAxis);
            state.zAxis = zAxis;
        },
        setSatteYaxis: (state: ISatelliteState, yAxis: number) => {
            console.log("Store module: setSatteYaxis: set degree: ", yAxis);
            state.yAxis = yAxis;
        },
        setPlatform: (state: ISatelliteState, platform: string) => {
            console.log("Store module: setPlatform: set degree: ", platform);
            state.platform = platform;
        },
    }
};
