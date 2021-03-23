export enum DeviceState {
    NOT_WORKING = "not-working",
    BROKEN = "broken",
    SCRATCH = "scratch",
    MICRO_SCRATCH = "micro-scratch",
    INTACT = "intact"
}

export const DeviceStateValue = new Map<DeviceState, number>([
    [DeviceState.NOT_WORKING, 0.4],
    [DeviceState.BROKEN, 0.5],
    [DeviceState.SCRATCH, 0.6],
    [DeviceState.MICRO_SCRATCH, 0.8],
    [DeviceState.INTACT, 1],
]);