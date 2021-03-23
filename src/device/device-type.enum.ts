export enum DeviceType {
    LAPTOP = "laptop",
    COMPUTER = "computer",
    MOBILE = "mobile",
    TELEVISION = "television",
    COMPUTER_SCREEN = "computer_screen",
    HEADPHONE = "headphone"
}

export const DeviceTypePrice = new Map<DeviceType, number>([
    [DeviceType.COMPUTER, 1000],
    [DeviceType.TELEVISION, 750],
    [DeviceType.LAPTOP, 800],
    [DeviceType.HEADPHONE, 200],
    [DeviceType.MOBILE, 300],
    [DeviceType.COMPUTER_SCREEN, 400]
]);