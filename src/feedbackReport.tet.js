import {describe, expect, it} from "vitest";
import generateProgressReport from "./progressReport";
import {assessment, student} from "./__mocks__/mockData";

/*
* Test Cases
*
* 1. it should print the correct date of assessment
* 2. it should not print the correct answer for student feedback
*
* */


describe("generateProgressReport()", () => {
    it("should return date and raw scores for each assessment", () => {
        // consider student has taken three assessments
        const result = generateProgressReport(assessment, student);
        const expectedResult = "Date: 14th December 2019, Raw Score: 6 out of 16";
        expect(result.details).toEqual(expect.arrayContaining([expectedResult]))
    });

    //TODO similar tests for the rest of functionalities
});
