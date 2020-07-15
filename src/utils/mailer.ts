import MailSender from 'noodle-email'
import gmailCredentials from './../../credentials/gmail.json'

const mailClient = new MailSender(gmailCredentials)
mailClient.setFrom('"StockPriceDataAPI" <ryankrol.m@gmail.com>')
mailClient.setTo('ryankrol.m@gmail.com')

async function sendMail(subject: string, body: string) {
  await mailClient.sendMail(subject, body)
}

export default sendMail
