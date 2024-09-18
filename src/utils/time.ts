// get duration from two date by moment

import moment, { unitOfTime } from 'moment'
import momenttz from 'moment-timezone'

export const getDuration = (startDate: string, endDate: string): number => {
  const start = moment(startDate)
  const end = moment(endDate)
  const duration = moment.duration(end.diff(start))
  const days = duration.asWeeks()
  return Math.round(days)
}

export const formatDate = (
  date: string | Date,
  format: string = 'YYYY-MM-DD',
) => {
  return moment(date).format(format)
}

export const calculateAge = (dob: string) => {
  const start = moment(dob)
  const end = moment()
  const duration = moment.duration(end.diff(start))
  const days = duration.asYears()
  return Math.round(days)
}

export const ExcelDateToJSDate = (serial: number) => {
  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)

  const fractional_day = serial - Math.floor(serial) + 0.0000001

  let total_seconds = Math.floor(86400 * fractional_day)

  const seconds = total_seconds % 60

  total_seconds -= seconds

  const hours = Math.floor(total_seconds / (60 * 60))
  const minutes = Math.floor(total_seconds / 60) % 60

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds,
  )
}

export const getDateWithTimeZone = (
  date: string | Date,
  zone: string = 'asia/dhaka',
) => {
  return momenttz.tz(date, zone)
}

const getTime = (time: string, index: number) => {
  if (!time) return ''
  return time?.split('-')?.[index] || ''
}

// convert time to 24 hour format
export const convertTimeTo24Hour = (time: string) => {
  if (!time) return ''
  const timeArray = time?.split(' ')
  const hour = timeArray?.[0]?.split(':')?.[0]
  const minute = timeArray?.[0]?.split(':')?.[1]
  const ampm = timeArray?.[1]
  if (ampm === 'PM') {
    return `${parseInt(hour) + 12}:${minute}`
  }
  return `${hour}:${minute}`
}

// convert time to 12 hour format
export const convertTimeTo12Hour = (time: string) => {
  if (!time) return ''
  const timeArray = time.split(':')
  const hour = timeArray[0]
  const minute = timeArray[1]
  if (parseInt(hour) > 12) {
    return `${parseInt(hour) - 12}:${minute} PM`
  }
  return `${hour}:${minute} AM`
}

const checkTimeGapBetweenTwo = (
  start: string,
  end: string | Date | number,
  checkGap: unitOfTime.Diff = 'days',
) => {
  return moment(end).diff(moment(start), checkGap)
}

export { checkTimeGapBetweenTwo, getTime }

// type Shift = {
//   id: number
//   shiftName: string
//   startHour: number
//   startMin: number
//   endHour: number
//   endMin: number
// }

// const shift: Shift[] = [
//   {
//     id: 406,
//     shiftName: 'Morning Shift',
//     startHour: 6,
//     startMin: 0,
//     endHour: 14,
//     endMin: 0,
//   },
//   {
//     id: 407,
//     shiftName: 'Afternoon Shift',
//     startHour: 14,
//     startMin: 0,
//     endHour: 22,
//     endMin: 0,
//   },
//   {
//     id: 408,
//     shiftName: 'Evening Shift',
//     startHour: 22,
//     startMin: 0,
//     endHour: 6,
//     endMin: 0,
//   },
// ]

// type Truck = {
//   createdat: number
//   tipoff: number | null
//   tipon: number | null
//   truckno: string
//   truckuniqueid: string
// }

// function toFixedTruncate(value: number, decimals: number) {
//   const factor = Math.pow(10, decimals)
//   return Math.floor(value * factor) / factor
// }

// const convertMillisecondsToHours = (ms: number) => {
//   const min = ms / 60000
//   const hours = Math.floor(min / 60)
//   let remainingMinutes = min % 60

//   // If remaining minutes are greater than or equal to 60, adjust accordingly
//   if (remainingMinutes >= 60) {
//     remainingMinutes -= 60
//   }

//   const hoursWithMinutes = hours + remainingMinutes / 100
//   return toFixedTruncate(hoursWithMinutes, 2)
// }

// const epochToDate = (epoch: number) => new Date(epoch * 1000)

// const calculateShiftHours = (start: number, end: number, shift: Shift) => {
//   const shiftStart = new Date(start)
//   shiftStart.setHours(shift.startHour, shift.startMin, 0, 0)

//   const shiftEnd = new Date(start)
//   if (shift.endHour < shift.startHour) {
//     // Shift crosses midnight
//     shiftEnd.setDate(shiftEnd.getDate() + 1)
//   }
//   shiftEnd.setHours(shift.endHour, shift.endMin, 0, 0)

//   // Check if the truck's time spans multiple shifts, including the evening shift that crosses midnight
//   console.log(`Shift Start: ${shiftStart} - End: ${shiftEnd}`)
//   console.log(`Truck Start: ${new Date(start)} - End: ${new Date(end)}`)

//   // If the truck's start time is before the morning shift (i.e., before 06:00),
//   // consider the time from midnight to morning as part of the previous day's evening shift.
//   if (shift.shiftName === 'Evening Shift' && start < shiftStart.getTime()) {
//     // Adjust the shift start time to midnight of the same day
//     const previousEveningShiftStart = new Date(shiftStart)
//     previousEveningShiftStart.setHours(0, 0, 0, 0) // Set to midnight

//     const previousEveningShiftEnd = new Date(shiftStart)
//     previousEveningShiftEnd.setHours(shift?.endHour, 0, 0, 0) // Set to 6:00 AM

//     // Calculate the hours for the time before the morning shift
//     if (start < previousEveningShiftEnd.getTime()) {
//       const startTime = new Date(
//         Math.max(start, previousEveningShiftStart.getTime()),
//       )
//       const endTime = new Date(Math.min(end, previousEveningShiftEnd.getTime()))

//       if (startTime.getTime() < endTime.getTime()) {
//         const res = endTime.getTime() - startTime.getTime()
//         console.log(
//           `Previous Evening Shift Result: ${convertMillisecondsToHours(res)}`,
//         )
//         return res
//       }
//     }
//   }

//   // Calculate the hours for the current shift (normal logic)
//   const startTime = new Date(Math.max(start, shiftStart.getTime()))
//   const endTime = new Date(Math.min(end, shiftEnd.getTime()))

//   // console.log(`Start Time: ${startTime} - End Time: ${endTime}`)

//   if (startTime.getTime() < endTime.getTime()) {
//     const res = endTime.getTime() - startTime.getTime()
//     console.log(`Result: ${convertMillisecondsToHours(res)}`)
//     return res
//   }

//   return 0
// }

// type TruckShiftData = Record<string, string | number>

// const now = new Date()

// // Create a date object for 4 AM today
// const startTime = new Date(now.setHours(4, 0, 0, 0))

// // Create a date object for 8 PM today
// const endTime = new Date(now.setHours(20, 0, 0, 0))

// // Convert to epoch time (seconds since 1970)
// const startEpoch = Math.floor(startTime.getTime() / 1000)
// const endEpoch = Math.floor(endTime.getTime() / 1000)

// const truckDetails: Truck[] = [
//   {
//     createdat: startEpoch,
//     tipon: 1725771649,
//     tipoff: endEpoch,
//     truckno: 'VT-35',
//     truckuniqueid: 'it_861557068904389',
//   },
//   {
//     createdat: 1725578089,
//     tipon: 1725768390,
//     tipoff: 1725768444,
//     truckno: 'VT-35',
//     truckuniqueid: 'it_861557068904389',
//   },
// ]

// function calculateTruckShiftHours(
//   trucks: Truck[],
//   shifts: 'Shift[]',
// ): TruckShiftData[] {
//   const result: { [key: string]: TruckShiftData } = {}
//   // let shift = {}

//   trucks.forEach((truck) => {
//     const { createdat, tipoff, truckno } = truck
//     const startTime = epochToDate(createdat).getTime()
//     const endTime = tipoff ? epochToDate(tipoff).getTime() : Date.now()
//     console.log(`\n Truck ${truckno} \n`)
//     if (!result[truckno]) {
//       result[truckno] = {
//         truckno,
//       }
//     }
//     let shiftStack: string[] = []
//     shifts.forEach((shift, index) => {
//       if (!result[truckno][shift.shiftName]) {
//         result[truckno][shift.shiftName] = 0
//         result[truckno][`${shift.shiftName} Count`] = 0
//       }
//       const time = calculateShiftHours(startTime, endTime, shift)
//       console.log(
//         `Truck ${truckno} - Shift ${shift.shiftName} - Hours: ${time}`,
//       )
//       const tripTime = Math.abs(endTime - startTime)
//       console.log(`Trip Time: ${tripTime} - Calculate Time ${time}`)
//       const isLast = shifts.length - 1 === index
//       const shiftStart = new Date(startTime)
//       shiftStart.setHours(shift.startHour, shift.startMin, 0, 0)
//       if (
//         shift.shiftName === 'Evening Shift' &&
//         startTime < shiftStart.getTime() &&
//         time !== 0
//       ) {
//         console.log(`Evening Shift Start: ${shiftStart}`)
//         shiftStack.unshift(shift?.shiftName)
//       }
//       console.log(`Shift Stack:`, shiftStack)
//       if (tripTime > time && time !== 0 && !isLast) {
//         // multipleShiftCount++
//         shiftStack.push(shift?.shiftName)
//       } else {
//         if (time > 0) {
//           if (shiftStack?.length > 0) {
//             result[truckno][`${shiftStack?.[0]} Count`] += 1
//           } else {
//             result[truckno][`${shift.shiftName} Count`] += 1
//           }
//           shiftStack = []
//         } else if (isLast && shiftStack?.length > 0) {
//           result[truckno][`${shiftStack?.[0]} Count`] += 1
//           shiftStack = []
//         }
//       }
//       console.log(
//         `Multiple Shift Count: ${shiftStack?.length} ${convertMillisecondsToHours(time)}`,
//         shiftStack,
//       )
//       result[truckno][shift.shiftName] = toFixedTruncate(
//         result[truckno][shift.shiftName] + convertMillisecondsToHours(time),
//         2,
//       )
//       console.log(`\n ================ \n`)
//     })
//     shiftStack = []
//   })
//   return Object.values(result)
// }

// export const shiftHours = calculateTruckShiftHours(truckDetails, shift)

// type Trucks = {
//   uniqueid: string
//   ts: string
//   lat: string
//   lng: string
//   speed: number
//   isha: boolean
//   ishb: boolean
//   distance: number
//   event_flag: string
//   fl_level: number
//   gps_status: string
//   gsm_signal: number
//   direction: number
//   external_bat_voltage: number
//   internal_bat_voltage: number
//   satellites: number
//   hdop: string
//   temperature: number
//   delta_distance: number
//   pluscode: string
//   xval: null
//   yval: null
//   zval: null
//   packet_event_code: string
//   analog2: number
//   server_ts: string
//   altitude: number
// }

// const trucks: Trucks[] = [
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:22:46.000Z',
//     lat: '25.891602',
//     lng: '71.369919',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 25,
//     direction: 273,
//     external_bat_voltage: 27800,
//     internal_bat_voltage: 4000,
//     satellites: 19,
//     hdop: '0.64',
//     temperature: 0,
//     delta_distance: 1.998,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:22:48.000Z',
//     altitude: 143,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:22:56.000Z',
//     lat: '25.891605',
//     lng: '71.369934',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 25,
//     direction: 273,
//     external_bat_voltage: 27900,
//     internal_bat_voltage: 4000,
//     satellites: 20,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 2.174,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:23:00.000Z',
//     altitude: 141,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:23:06.000Z',
//     lat: '25.891615',
//     lng: '71.369942',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 24,
//     direction: 273,
//     external_bat_voltage: 27900,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 1.615,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:23:11.000Z',
//     altitude: 140,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:23:16.000Z',
//     lat: '25.891619',
//     lng: '71.369942',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 24,
//     direction: 273,
//     external_bat_voltage: 27900,
//     internal_bat_voltage: 4000,
//     satellites: 20,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0.402,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:23:21.000Z',
//     altitude: 140,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:23:26.000Z',
//     lat: '25.891617',
//     lng: '71.369934',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 27900,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 1.408,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:23:31.000Z',
//     altitude: 141,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:23:36.000Z',
//     lat: '25.891626',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 27800,
//     internal_bat_voltage: 3900,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 1.669,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:23:42.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:23:46.000Z',
//     lat: '25.891626',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 27900,
//     internal_bat_voltage: 4000,
//     satellites: 20,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0.849,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:23:48.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:23:56.000Z',
//     lat: '25.891632',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26700,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0.425,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:23:58.000Z',
//     altitude: 143,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:24:06.000Z',
//     lat: '25.891632',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 3900,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:24:08.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:24:16.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 20,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:24:19.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:24:26.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:24:29.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:24:36.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:24:39.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:24:46.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:24:49.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:24:56.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:24:59.000Z',
//     altitude: 142,
//   },

//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:25:06.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:25:09.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:25:16.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:25:19.000Z',
//     altitude: 142,
//   },

//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:25:26.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:25:29.000Z',
//     altitude: 142,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     ts: '2024-09-07T18:25:36.000Z',
//     lat: '25.891634',
//     lng: '71.369926',
//     speed: 0,
//     isha: false,
//     ishb: false,
//     distance: 0,
//     event_flag: '1073744897',
//     fl_level: 0,
//     gps_status: 'A',
//     gsm_signal: 26,
//     direction: 273,
//     external_bat_voltage: 26600,
//     internal_bat_voltage: 4000,
//     satellites: 21,
//     hdop: '0.61',
//     temperature: 0,
//     delta_distance: 0,
//     pluscode: '7JQHV9R9+',
//     xval: null,
//     yval: null,
//     zval: null,
//     packet_event_code: 'L',
//     analog2: 0,
//     server_ts: '2024-09-07T18:25:39.000Z',
//     altitude: 142,
//   },
// ]

// const checkTimeInBetweenShift = (time: number, shift: Shift): number => {
//   const shiftStart = new Date(time)
//   shiftStart.setHours(shift.startHour, shift.startMin, 0, 0)

//   const shiftEnd = new Date(time)
//   if (shift.endHour < shift.startHour) {
//     // Shift crosses midnight
//     shiftEnd.setDate(shiftEnd.getDate() + 1)
//   }
//   shiftEnd.setHours(shift.endHour, shift.endMin, 0, 0)

//   if (shift.shiftName === 'Evening Shift' && time < shiftStart.getTime()) {
//     // Adjust the shift time time to midnight of the same day
//     const previousEveningShiftStart = new Date(shiftStart)
//     previousEveningShiftStart.setHours(0, 0, 0, 0) // Set to midnight

//     const previousEveningShiftEnd = new Date(shiftStart)
//     previousEveningShiftEnd.setHours(shift?.endHour, 0, 0, 0) // Set to 6:00 AM

//     // Calculate the hours for the time before the morning shift
//     if (time < previousEveningShiftEnd.getTime()) {
//       const check =
//         previousEveningShiftStart.getTime() < time &&
//         time < previousEveningShiftEnd.getTime()
//       return check ? 10 : 0
//     }
//   }
//   const check = shiftStart.getTime() < time && time < shiftEnd.getTime()
//   return check ? 10 : 0
// }

// const convertSecondToMin = (second: number) => {
//   return toFixedTruncate(second / 60, 2)
// }

// const convertMinToHour = (min: number) => {
//   return toFixedTruncate(min / 60, 2)
// }

// const calculateTruckShiftHours = (trucks: Trucks[], shifts: Shift[]) => {
//   const result: { [key: string]: TruckShiftData } = {}
//   trucks.forEach((truck) => {
//     const { ts, uniqueid } = truck
//     const startTime = new Date(ts).getTime()
//     if (!result[uniqueid]) {
//       result[uniqueid] = {
//         uniqueid,
//       }
//     }
//     shifts.forEach((shift) => {
//       if (!result[uniqueid][shift.shiftName]) {
//         result[uniqueid][shift.shiftName] = 0
//       }
//       const time = checkTimeInBetweenShift(startTime, shift)
//       result[uniqueid][shift.shiftName] += time
//     })
//   })
//   return Object.values(result)?.map(({ uniqueid, ...rest }) => {
//     const obj: Record<string, number> = {}
//     Object.keys(rest).forEach((key) => {
//       const min = convertSecondToMin(rest[key])
//       console.log(key, rest[key], min, convertMinToHour(min), min / 60)
//       obj[key] = convertMinToHour(convertSecondToMin(rest[key]))
//     })
//     return {
//       uniqueid,
//       ...obj,
//     }
//   })
// }

// export const shiftHours = calculateTruckShiftHours(trucks, shift)

// const shiftHour: TruckShiftData[] = [
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
//   {
//     uniqueid: 'it_861557068958443',
//     'Morning Shift': 0,
//     'Afternoon Shift': 0,
//     'Evening Shift': 0.05,
//   },
// ]

// /*
//  Output:
//  {
//   "Morning Shift": 0,
//   "Afternoon Shift": 0,
//   "Evening Shift": 0.05
//  }
// */
// export const totalShiftHours = (shiftHours: TruckShiftData[]) => {
//   // const result: Record<string, number> = {}
//   const result: Record<string, number> = {}
//   shiftHours.forEach((shift) => {
//     const { uniqueid, ...rest } = shift
//     Object.keys(rest).forEach((key) => {
//       if (!result[key]) {
//         result[key] = 0
//       }
//       result[key] = toFixedTruncate(result[key] + shift[key], 2)
//     })
//   })
//   return result
// }

// export const totalShift = totalShiftHours(shiftHour)
