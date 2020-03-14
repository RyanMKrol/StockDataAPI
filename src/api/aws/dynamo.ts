import DynamoDBWrapper from 'noodle-dynamo'
import dynamoCredentials from './../../../credentials/dynamo.json'

const AWS_REGION = 'us-east-2'
const dynamoDb = new DynamoDBWrapper(dynamoCredentials, AWS_REGION)

export async function readHeatmapCache() {
  const table = 'TickerData'
  const expression = 'dataType = :type'
  const expressionData = {
    ':type': 'cache',
  }

  await dynamoDb.readTable(table, expression, expressionData)
}

export async function writeHeatmapCache(cacheData: any) {
  const tableName = 'TickerData'
  const insertItem = {
    'itemType': 'cache',
    'priceData': cacheData,
  }

  await dynamoDb.writeTable(tableName, insertItem)
}

export async function readTickerTable(ticker: string) {
  const table = 'TickerData'
  const expression = 'ticker = :ticker'
  const expressionData = {
    ':ticker': ticker,
  }

  await dynamoDb.readTable(table, expression, expressionData)
}
