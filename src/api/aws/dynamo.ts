import DynamoDBWrapper from 'noodle-dynamo'
import dynamoCredentials from './../../../credentials/dynamo.json'

const AWS_REGION = 'us-east-2'
const dynamoDb = new DynamoDBWrapper(dynamoCredentials, AWS_REGION)

const CACHE_TICKER_ALIAS = 'CACHE'

export async function readTickerTable(ticker: string) {
  const table = 'TickerData'
  const expression = 'ticker = :ticker'
  const expressionData = {
    ':ticker': ticker,
  }

  return await dynamoDb.readTable(table, expression, expressionData)
}

export async function readHeatmapCache() {
  const table = 'TickerData'
  const expression = 'ticker = :ticker'
  const expressionData = {
    ':ticker': CACHE_TICKER_ALIAS,
  }

  return await dynamoDb.readTable(table, expression, expressionData)
}


export async function writeHeatmapCache(cacheData: any) {
  const tableName = 'TickerData'
  const insertItem = {
    'ticker': CACHE_TICKER_ALIAS,
    'priceData': cacheData,
  }

  await dynamoDb.writeTable(tableName, insertItem)
}
