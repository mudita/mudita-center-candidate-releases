export default interface BatteryInfo {
  // Current battery's capacity. Float in 0-1 range.
  readonly level: number

  // Is the phone currently charging?
  readonly charging: boolean

  // Maximum battery's capacity compared to its initial state. Float in 0-1 range.
  readonly maximumCapacity: number
}
