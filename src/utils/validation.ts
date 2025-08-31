export const urlRegex: RegExp = /https?:\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[\w\-\/\.\?\=\#\%\&]*)?/

export function matchIfExists(regex: RegExp, message: string) {
    return (value: string | null) => {
        if (!value || value.trim() === '') {return null;} // Don't validate empty fields
        return regex.test(value) ? null : message;
    };
}