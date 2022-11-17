import nodeMailer from './nodemailer';

export enum MailingType {
  SIGNUP = 'b',
  PASSWORD = 'a'
}

export async function sendEmail(
  recipients: string[],
  subject: string,
  emailType: MailingType,
  templateVariables?: Record<string, unknown>
): Promise<boolean> {
  const mailingClient = await nodeMailer.getMailingClient();
  const result = await mailingClient.sendEmail(
    recipients,
    subject,
    emailType,
    templateVariables || {}
  );

  return result;
}
