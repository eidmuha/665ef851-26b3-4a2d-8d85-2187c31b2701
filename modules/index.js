const assessmentsData = require("./data/assessments.json");
const questionsData = require("./data/questions.json");
const studentResponsesData = require("./data/student-responses.json");
const studentsData = require("./data/students.json");
const prompt = require("prompt-sync")();
const moment = require("moment");

const countUnique = arr => {
    const counts = {};
    for (let i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        counts[`${arr[i]} correct answers`] = 0;
    }
    return counts;
};

const findQuestion = (qId) => {
    return questionsData.find(q => q.id === qId);
};

const app = () => {
    console.info("\n Please enter the following: \n");
    const studentId = prompt("Student ID: ");
    const reportType = prompt("Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): ");
    const strands = questionsData.map((item) => item.strand);
    const strandsCount = countUnique(strands)
    const student = studentsData.find(st => st.id === studentId);
    const studentFullName = `${student.firstName} ${student.lastName}`;

    function getLatestAssessment(assessment) {
        let latestAssessment = null;
        studentResponsesData.filter(sResponse => {
            // getting the latest assessment
            if (sResponse.student.id === studentId && sResponse.assessmentId === assessment.id && sResponse.completed) {
                if (latestAssessment && sResponse.student.yearLevel) {
                    // get latest response based on the last year
                    if (sResponse.student.yearLevel > latestAssessment.student.yearLevel) {
                        latestAssessment = sResponse;
                    }
                } else if (sResponse) {
                    latestAssessment = sResponse;
                }
            }
        });
        return latestAssessment;
    }

    // Case 1
    const generateDiagnosticReport = (assessment) => {
        let latestAssessment = getLatestAssessment(assessment);

        if (latestAssessment) {
            const date = moment(latestAssessment.completed, "DD.MM.YYYY hh.mm.ss").format("Do MMMM gggg LT");
            console.log(`${studentFullName} has completed ${assessment.name} assessment on ${date}`);
            console.info(`He got ${latestAssessment.results.rawScore} questions right out of ${questionsData.length}. Details by strand given bellow\n`);

            for (const key in strandsCount) {
                if (!key.toString().includes("correct answers")) {
                    latestAssessment.responses.forEach(res => {
                        const question = findQuestion(res.questionId);
                        if (question && question.config.key === res.response && key === question.strand) {
                            strandsCount[`${key} correct answers`] = strandsCount[`${key} correct answers`] + 1;
                        }
                    });
                }
            }

            for (const key in strandsCount) {
                if (key.toString().includes("correct answers")) {
                    console.info(`${key}: ${strandsCount[key]} our of ${strandsCount[key.replace(" correct answers","")]} correct`);
                }
            }

            console.info("");
        }

    };

    // Case 2
    const generateProgressReport = (assessment) => {
        const tsAssessments = studentResponsesData.filter(ass => ass.student.id === student.id && ass.completed);

        const subTitle = `${studentFullName} has completed ${assessment.name} assessment ${tsAssessments.length}`;
        console.log(`\n${subTitle} times in total. Date and raw score given below:\n`);

        let rawScores = [];
        tsAssessments.forEach(tsAssessment => {
            const tDate = `Date: ${ moment(tsAssessment.assigned, "DD.MM.YYYY hh.mm.ss").format("Do MMMM gggg")}`;
            const tScore = `Raw Score: ${tsAssessment.results.rawScore} out of ${tsAssessment.responses.length}`;
            console.info(`${tDate}, ${tScore}`);
            rawScores.push(tsAssessment.results.rawScore);
        });

        console.log("");

        const minScore = Math.min(...rawScores);
        const maxScore = Math.max(...rawScores);
        const diff = maxScore - minScore;
        if (diff > 0) {
            console.info(`${studentFullName} got ${diff} more correct in the recent completed assessment than the oldest`);
        } else if (diff < 0) {
            console.info(`${studentFullName} got ${minScore - maxScore} less correct in the recent completed assessment than the oldest`);
        } else {
            console.info(`${studentFullName} got same correct in the recent completed assessment than the oldest`);
        }

        console.log("");

    };



    assessmentsData.forEach(assessment => {
        switch (reportType) {
            case "1":
                console.log("\n============= Diagnostic Report =============");
                generateDiagnosticReport(assessment);
                break;
            case "2":
                console.log("\n============= Progress Report =============");
                generateProgressReport(assessment);
                break;
            case "3":
                console.log("\n============= Feedback Report =============");
                // generateFeedbackReport(assessment);
                break;
            default:
                console.log("\nNo report generated. Please run the app again and enter report to generate!\n");
        }
    });

    return "App";
};

module.exports = app;
