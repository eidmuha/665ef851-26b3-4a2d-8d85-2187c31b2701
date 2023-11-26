import {describe, expect, it} from "vitest";
import generateDiagnosticReport from "./diagnosticReport";
import {assessment, studentName, studentResponse} from "./__mocks__/mockData";
import generateFeedbackReport from "./feedbackReport";

/*
* Test Cases
*
* 1. it should print the correct number of assessments taken by the student
* 2. it should print the correct dates of assessments along with the score.
* 3. total number of score on each date should not be greater than the total questions
* 4. it should display the correct output based on the recent score and the oldest score
*
* */

describe("generateDiagnosticReport()", () => {
    it("should return the correct title", () => {
        // assume 15 out of 16 questions are right
        const result = generateFeedbackReport(assessment, studentResponse, studentName);
        const expectedResult = "He got 15 questions right out of 16. Feedback for wrong answers given below";
        expect(result.subTitle).toEqual(expectedResult);
    });

    //TODO similar tests for the rest of functionalities
});

