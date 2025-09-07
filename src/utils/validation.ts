type ValidatorFn = (value: string | null) => string | null

export const urlRegex: RegExp =
  /https?:\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[\w\-\/\.\?\=\#\%\&]*)?/;


/**
* Create function to match non-null value against regex pattern.
* Used as form validation.
* @param regex - pattern to match
* @param message - message to return on no match
* @returns - function to run to check the regex
*/
export function matchIfExists(regex: RegExp, message: string): ValidatorFn {
  return (value: string | null) => {
    if (!value || value.trim() === '') {
      return null;
    } // Don't validate empty fields
    return regex.test(value) ? null : message;
  };
}
