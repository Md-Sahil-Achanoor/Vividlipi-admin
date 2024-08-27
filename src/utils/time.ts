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
