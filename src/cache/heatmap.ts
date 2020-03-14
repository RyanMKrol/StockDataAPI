import schedule from 'node-schedule'
import async from 'async'

import {
  readTickerTable,
  readHeatmapCache,
  writeHeatmapCache,
} from './../api/aws'
import { fetchIndexTickers } from './../api/stocktickersapi'
import {
  processPriceDataForCacheWrite,
  processDataForCacheRead,
} from './../process'
import { wait, sendMail } from './../utils'

// configuring the seconds wait to keep consumption of read credits low
const SECONDS_WAIT = 10
const MS_IN_S = 1000

// requests are done in batches to reduce the amount of reads per second going to dynamo
const MAX_CONCURRENT_REQUESTS = 10

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

  private async fetchCurrentCache() {
    try {
      const currentCacheData = await readHeatmapCache()
      this.data = processDataForCacheRead(currentCacheData)
    } catch (error) {
      sendMail('Failed to read heatmap cache', error.toString())
    }
  }

  private async scheduleCacheUpdate() {
    const self = this

    schedule.scheduleJob('0 0 16 * * *', async () => {
      await sendMail('Starting the hearmap cache update for the day!', '')

      const tickers = await fetchIndexTickers()

      await new Promise((resolve, reject) => {
        async.mapLimit(tickers, MAX_CONCURRENT_REQUESTS, async function(ticker: string, callback: Function) {
          try {
            // wait at the beginning in case anything goes wrong some point in the middle
            await wait(SECONDS_WAIT*MS_IN_S)

            const tickerData = await readTickerTable(ticker)
            const dataEntry = processPriceDataForCacheWrite(tickerData)

            self.data[ticker] = dataEntry

            callback()
          } catch (error) {
            const errorMessage =
              `Encountered an error when gathering data for ticker - ${ticker}, error = ${error.toString()}`
            sendMail('Failed to read data for cache update!', errorMessage)
            callback()
          }
        }, (err: any, results: any) => {
          resolve()
        })
      })

      await writeHeatmapCache(self.data)
      await sendMail('Successfully updated the heatmap cache for the day!', '')
    })
  }
}

export default HeatMapCache
