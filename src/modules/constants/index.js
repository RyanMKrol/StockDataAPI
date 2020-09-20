/** @module constants */

import DYNAMO_CREDENTIALS from '../../../credentials/dynamo.json';
import GMAIL_CREDENTIALS from '../../../credentials/gmail.json';

const SUPPORTED_TIME_PERIODS = {
  one_month: 30,
  three_month: 90,
  six_month: 180,
  one_year: 360,
  two_year: 720,
};

export { SUPPORTED_TIME_PERIODS, DYNAMO_CREDENTIALS, GMAIL_CREDENTIALS };
