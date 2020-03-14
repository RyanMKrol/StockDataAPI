import { SupportedTimePeriods } from './../types'

const DAYS_RETRY = 5

export function processPriceDataForCacheWrite(priceData: any) {
  if (priceData.Count !== 1 || priceData.Items.length !== 1 || !priceData.Items[0].priceData) {
    throw new Error('Could not parse price data item')
  }
  const prices = priceData.Items[0].priceData

  const data: any = {}

  const enumValues: Array<string> = Object.values(SupportedTimePeriods)
  enumValues.map((period) => {
    const startingDate: Date = getStartingDateForTimePeriod(period)
    const pastPrice: number | null = getLastTradingDateData(prices, startingDate)
    const todayPrice: number | null = getLastTradingDateData(prices, new Date())

    if (pastPrice && todayPrice) {
      data[period] = (todayPrice/pastPrice*100)-100
    }
  })

  return data
}

// This will get the date corresponding to the last day of finished trading
function getLastTradingDateData(data: any, date: Date, retryAttempt: number = 0): number | null {
  date.setDate(date.getDate() - retryAttempt)

  const yearString = date.getFullYear().toString()
  const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
  const dayString = date.getDate().toString().padStart(2, '0')

  const dateString = `${yearString}-${monthString}-${dayString}`

  const dateData = data.filter((item: any) => item.date === dateString)

  if (dateData.length === 1) {
    return dateData[0].priceData
  } else if (retryAttempt < DAYS_RETRY) {
    return getLastTradingDateData(data, date, retryAttempt + 1)
  } else {
    return null
  }
}

function getStartingDateForTimePeriod(period: string): Date {
  const date = new Date()

  switch(period) {
  case SupportedTimePeriods.OneMonth:
    date.setMonth(date.getMonth() - 1)
    break
  case SupportedTimePeriods.ThreeMonth:
    date.setMonth(date.getMonth() - 3)
    break
  case SupportedTimePeriods.SixMonth:
    date.setMonth(date.getMonth() - 6)
    break
  case SupportedTimePeriods.OneYear:
    date.setFullYear(date.getFullYear() - 1)
    break
  case SupportedTimePeriods.TwoTear:
    date.setFullYear(date.getFullYear() - 2)
    break
  default:
    throw new Error('Have not provided a supported time period')
  }

  return date
}
