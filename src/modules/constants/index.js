import DYNAMO_CREDENTIALS from '../../../credentials/dynamo.json';
import GMAIL_CREDENTIALS from '../../../credentials/gmail.json';

const DYNAMO_REGION = 'us-east-2';
const DATA_STORE_KEY_HEATMAPS = 'heatmaps';
const DATA_STORE_KEY_TICKERS = 'tickers';

const SUPPORTED_TIME_PERIODS = {
  one_month: 30,
  three_month: 90,
  six_month: 180,
  one_year: 360,
  two_year: 720,
};

const SUPPORTED_INDEXES = {
  ftse_100: 'https://www.londonstockexchange.com/indices/ftse-100/constituents/table',
  ftse_250: 'https://www.londonstockexchange.com/indices/ftse-250/constituents/table',
  ftse_350: 'https://www.londonstockexchange.com/indices/ftse-350/constituents/table',
  ftse_all_share: 'https://www.londonstockexchange.com/indices/ftse-all-share/constituents/table',
  ftse_small_cap:
    'https://www.londonstockexchange.com/indices/ftse-aim-all-share/constituents/table',
};

export {
  SUPPORTED_TIME_PERIODS,
  SUPPORTED_INDEXES,
  DYNAMO_CREDENTIALS,
  GMAIL_CREDENTIALS,
  DYNAMO_REGION,
  DATA_STORE_KEY_HEATMAPS,
  DATA_STORE_KEY_TICKERS,
};
