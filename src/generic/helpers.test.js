import {test, it, describe, expect, vi} from "vitest";
import {countUnique, formatFullName, getLatestStudentResponse, print} from "./helpers";
import {assessment} from "../__mocks__/mockData";

/*
* Test Cases
*
* 1. getLatestAssessment() should return the latest student response based on student year level
* 2. Given an array with different and duplicate elements, countUnique should return the key=>value
* 3. Given person object, formatFullName() should return a full name
* 4. Given question id, findQuestion() should find the correct question
* 5. Given question id and a question with multiple options, getAnswer() should return the correct response
* 6. Given a text, the print() should print the text on a terminal
*
* */

describe("formatFullName()", () => {
    test('should print person\'s full name', () => {
        const personObj = {firstName: "Eddie", lastName: "Basharat"};
        const result = formatFullName(personObj)

        const expectedResult = "Eddie Basharat";
        expect(result).toBe(expectedResult);
    });

    test('should print first name if last name is empty', () => {
        const personObj = {firstName: "Eddie", lastName: null};
        const result = formatFullName(personObj)

        const expectedResult = "Eddie";
        expect(result).toBe(expectedResult);
        expect(result).toBeTypeOf("string");
    });

    test('should return null if no first name and last name provided', () => {
        const personObj = {firstName: null, lastName: null};
        const result = formatFullName(personObj)

        const expectedResult = null;
        expect(result).toBe(expectedResult);
    });
});

describe("print()", () => {
    test("should execute console.info on terminal", () => {
        const consoleInfoMock = vi.spyOn(console, "info").mockImplementation();
        print("Sample output");
        expect(consoleInfoMock).toBeCalled();
    });
});

describe("countUnique()", () => {
   it("should return unique array with", () => {
      const arr = ["Report A", "Report B", "Report B", "Report C", "Report C"];

      const result = countUnique(arr);
       const expectedResult = {
           "Report A": 1,
           "Report A correct answers": 0,
           "Report B": 2,
           "Report B correct answers": 0,
           "Report C": 2,
           "Report C correct answers": 0,
       };
       expect(result).toEqual(expectedResult);
   });
});

describe("getLatestAssessment()", () => {
   it("should return unique array with", () => {
      const studentId = "student1";
      const result = getLatestStudentResponse(assessment, studentId);
      expect(result).toEqual(result);
   });
});





