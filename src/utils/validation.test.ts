import { matchIfExists, urlRegex } from "./validation";


describe("test validation functions", () => {
    let validate: ReturnType<typeof matchIfExists>;

    beforeEach(() => {
        validate = matchIfExists(urlRegex, 'no match')
    })

    it.each([
        ["https://www.test12345.com"],
        ["https://www.anothertest.co.uk"],
        ["https://www.recipes.org"],
    ])("returns null for a valid website", (testValue: string | null) => {
        expect(validate(testValue)).toBeNull();
    })

    it.each([
        ['test'],
        ["htps://www.mywebsite.com"],
        ["https:/www.mywebsite.com"],
        ["https//www.testwebsite.com"]
    ])("returns message for invalid websites", (testValue: string | null) => {
        expect(validate(testValue)).toBe("no match");
    })

    it.each([
        [''],
        [null]
    ])("returns null for a null or empty string value", (testValue) => {
        expect(validate(testValue)).toBeNull();
    })
})