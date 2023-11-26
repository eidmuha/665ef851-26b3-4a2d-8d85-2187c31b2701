import {describe, expect, it, test} from "vitest";
import generateDiagnosticReport from "./diagnosticReport";
import {assessment, studentName, studentResponse} from "./__mocks__/mockData";

/*
* Test cases
*
* 1. generateDiagnosticReport should get all the existing strands and count unique ones
* 2. it should print the right information on the terminal
* 3. The number of correct responses should not be greater than the number of total questions in each category
* 4. The app should print all categories along with strands data
*
* */

describe("generateDiagnosticReport()", () => {
    it("should return the correct title", () => {
        const result = generateDiagnosticReport(assessment, studentResponse, studentName);
        const expectedResult = "Eddie Basharat has completed Numeracy assessment on 16th December 2021 10:46 AM";
        expect(result.title).toEqual(expectedResult);
    });

    //TODO similar tests for the rest of functionalities
});
