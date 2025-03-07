
export function userEmail(email: string): string {
  const splittedEmail = email.split('@')[0].replace(/[.,]/g, '');
  return splittedEmail;
}