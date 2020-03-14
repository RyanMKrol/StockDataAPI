export function processPriceDataForCacheRead(cacheData: any) {
  if (!cacheData.priceData) {
    throw new Error('Could not read the cache data!')
  }

  return cacheData.priceData
}
