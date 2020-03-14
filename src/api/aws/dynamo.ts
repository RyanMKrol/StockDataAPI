import DynamoDBWrapper from 'noodle-dynamo'
import dynamoCredentials from './../../../credentials/dynamo.json'

const AWS_REGION = 'us-east-2'
const dynamoDb = new DynamoDBWrapper(dynamoCredentials, AWS_REGION)

export function readHeatmapCache() {
  const table = 'TickerData'
  const expression = 'dataType = :type'
  const expressionData = {
    ':type': 'cache',
  }

  return dynamoDb.readTable(table, expression, expressionData)
}

export function writeHeatmapCache(cacheData: any) {
  const tableName = 'TickerData'
  const insertItem = {
    'itemType': 'cache',
    'priceData': cacheData,
  }

  return dynamoDb.writeTable(tableName, insertItem)
}

export function readTickerTable(ticker: string) {
  const table = 'TickerData'
  const expression = 'ticker = :ticker'
  const expressionData = {
    ':ticker': ticker,
  }

  return dynamoDb.readTable(table, expression, expressionData)
}
