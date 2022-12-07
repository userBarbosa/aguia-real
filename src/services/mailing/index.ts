import nodeMailer from './nodemailer';

export enum MailingType {
  REQUEST_NEW_PASSWORD = './dist/services/mailing/templates/reset_password.html',
  CONFIRM_EMAIL = './dist/services/mailing/templates/confirm_email.html'
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
