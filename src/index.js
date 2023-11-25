const assessmentsData = require("./data/assessments.json");
const studentsData = require("./data/students.json");
const prompt = require("prompt-sync")();
const {getLatestAssessment, formatFullName} = require("./generic/helpers");
const generateDiagnosticReport = require("./diagnosticReport");
const generateProgressReport = require("./progressReport");
const generateFeedbackReport = require("./feedbackReport");

const app = () => {
    console.info("\n Please enter the following: \n");

    // user inputs
    const studentId = prompt("Student ID: ");
    const reportType = prompt("Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): ");

    // get student data
    const student = studentsData.find(st => st.id === studentId);
    const studentName = formatFullName(student);

    // Loop in case there are multiple assessments
    assessmentsData.forEach(assessments => {

        // get latest assessment based on student's year level
        let latestAssessment = getLatestAssessment(assessments, student.id);

        switch (reportType) {
            case "1":
                console.log("\n============= Diagnostic Report =============\n");
                generateDiagnosticReport(assessments, latestAssessment, studentName);
                break;
            case "2":
                console.log("\n============= Progress Report =============\n");
                generateProgressReport(assessments, student);
                break;
            case "3":
                console.log("\n============= Feedback Report =============\n");
                generateFeedbackReport(assessments, latestAssessment, studentName);
                break;
            default:
                console.log("\nNo report generated. Please run the app again and enter report to generate!\n");
        }
    });
};

module.exports = app;
