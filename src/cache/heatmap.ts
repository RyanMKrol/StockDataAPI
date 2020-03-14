import schedule from 'node-schedule'
import async from 'async'
import { readTickerTable } from './../api/aws'
import { fetchIndexTickers } from './../api/stocktickersapi'
import { processHeatmapCacheItem } from './../process'
import { wait } from './../utils'

// configuring the seconds wait to keep consumption of read credits low
const SECONDS_WAIT = 10
const MS_IN_S = 1000

// requests are done one at a time to reduce the amount of writes per second going to dynamo
const MAX_CONCURRENT_REQUESTS = 1


class HeatMapCache {
  private static instance: HeatMapCache
  private data: any = {}

  private constructor() {
    this.fetchCurrentCache()
    this.scheduleCacheUpdate()
  }

  static getInstance(): HeatMapCache {
    if (!HeatMapCache.instance) {
      HeatMapCache.instance = new HeatMapCache()
    }
    return HeatMapCache.instance
  }

  private fetchCurrentCache() {
    // const currentCacheData = readHeatmapCache
    console.log('fetching the current cache data')
    console.log(this.data)
    // this.data = currentCacheData
  }

  private async scheduleCacheUpdate() {
    schedule.scheduleJob('0 0 16 * * *', async () => {
    })
    const self = this
    const tickers = (await fetchIndexTickers()).slice(0,2)
    console.log(tickers)
    console.log('starting the work of fetching everytthing')
    await new Promise((resolve, reject) => {
      async.mapLimit(tickers, MAX_CONCURRENT_REQUESTS, async function(ticker: string, callback: Function) {
        try {
          const tickerData = await readTickerTable(ticker)
          const dataEntry = processHeatmapCacheItem(tickerData)

          self.data[ticker] = dataEntry
          console.log('starting wait')
          await wait(SECONDS_WAIT*MS_IN_S)
          console.log('finished wait')

          callback()
        } catch (error) {
          const errorMessage =
            `Encountered an error when gathering data for ticker - ${ticker}, error = ${error.toString()}`
          console.log(errorMessage)
          callback()
        }
      }, (err: any, results: any) => {
        resolve()
      })
    })
    console.log('finished the work of fetching everytthing')
  }
}

export default HeatMapCache
