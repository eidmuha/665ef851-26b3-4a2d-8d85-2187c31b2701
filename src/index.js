const assessmentsData = require("./data/assessments.json");
const studentsData = require("./data/students.json");
const prompt = require("prompt-sync")();
const {getLatestStudentResponse, formatFullName, print} = require("./generic/helpers");
const generateDiagnosticReport = require("./diagnosticReport");
const generateProgressReport = require("./progressReport");
const generateFeedbackReport = require("./feedbackReport");

const app = () => {
    print("\nPlease enter the following: \n");

    // user inputs
    const studentId = prompt("Student ID: ");
    const reportType = prompt("Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): ");

    // get student data
    const student = studentsData.find(st => st.id === studentId);

    if (student === undefined) {
        print("\nNo student id provided or found. exiting ....\n");
        return;
    }

    const studentName = formatFullName(student);

    // Loop in case there are multiple assessments
    assessmentsData.forEach(assessments => {
        // get latest student response based on student's year level
        let latestStudentResponse = getLatestStudentResponse(assessments, student.id);

        let result = null;
        switch (reportType) {
            case "1":
                print("\n============= Diagnostic Report =============\n");

                result = generateDiagnosticReport(assessments, latestStudentResponse, studentName);
                print(`${result.title}\n${result.subTitle}\n\n${result.details.join("\n")}\n`);

                break;
            case "2":
                print("\n============= Progress Report =============\n");

                result = generateProgressReport(assessments, student);
                print(`${result.title}\n\n${result.details.join("\n")}\n\n${result.info}\n`);

                break;
            case "3":
                print("\n============= Feedback Report =============\n");

                result = generateFeedbackReport(assessments, latestStudentResponse, studentName);
                print(`${result.title}\n${result.subTitle}\n\n${result.details.join("\n")}\n`);

                break;
            default:
                print("\nNo report generated. Please run the app again and enter report to generate!\n");
        }
    });
};

module.exports = app;
