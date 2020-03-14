export function processDataForCacheRead(cacheData: any) {
  if (cacheData.Count !== 1 || cacheData.Items.length !== 1 || !cacheData.Items[0].priceData) {
    throw new Error('Could not read the cache data!')
  }

  return cacheData.Items[0].priceData
}
