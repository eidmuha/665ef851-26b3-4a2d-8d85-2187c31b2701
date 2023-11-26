import {describe, it, expect} from "vitest";
import studentsData from "./data/students.json";
import generateDiagnosticReport from "./diagnosticReport";
import generateProgressReport from "./progressReport";
import generateFeedbackReport from "./feedbackReport";
import {students} from "./__mocks__/mockData";

/*
* Test cases
*
* 1. The input student id should not be null
* 2. The app should prompt the two questions for user input
* 3. The app should respond to different cases and output correct information
*
* */

describe("app()", () => {
    it("should find the student given student id", () => {
        const result = students.find(st => st.id === "001");
        const expectedResult = {
            "id": "001",
            "firstName": "Tony",
            "lastName": "Stark",
            "yearLevel": 6
        };

        expect(result).toEqual(expectedResult);
    });

    it("student id should be found", () => {
        const studentId = undefined;
        const student = studentsData.find(st => st.id === studentId);
        expect(student).toBeUndefined();
    });

    it("The app should respond to different cases", () => {
        let reportType = "4";
        switch (reportType) {
            case "1":
                expect(generateDiagnosticReport).toBeCalled();
                break;
            case "2":
                expect(generateProgressReport).toBeCalled();
                break;
            case "3":
                expect(generateFeedbackReport).toBeCalled();
                break;
            default:
        }
    });
});

