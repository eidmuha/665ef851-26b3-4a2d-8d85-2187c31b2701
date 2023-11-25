const moment = require("moment");
const questionsData = require("./data/questions.json");
const {findQuestion, countUnique, print} = require("./generic/helpers");

const generateDiagnosticReport = (assessment, latestAssessment, studentName) => {

    // Get all strands name
    const strands = questionsData.map((item) => item.strand);

    // Count unique strands
    const strandsCount = countUnique(strands)

    if (latestAssessment) {
        const date = moment(latestAssessment.completed, "DD.MM.YYYY hh.mm.ss").format("Do MMMM gggg LT");

        print(`${studentName} has completed ${assessment.name} assessment on ${date}`);

        // print out the number of right question
        const info = `He got ${latestAssessment.results.rawScore} questions right out of ${questionsData.length}.`;
        print(`${info} Details by strand given bellow\n`);

        // find the number of correct answers based on different strands
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

        // print details by strand
        for (const key in strandsCount) {
            if (key.toString().includes("correct answers")) {
                print(`${key}: ${strandsCount[key]} our of ${strandsCount[key.replace(" correct answers", "")]} correct`);
            }
        }

        print("");
    }
};

module.exports = generateDiagnosticReport
