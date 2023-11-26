const moment = require("moment");
const questionsData = require("./data/questions.json");
const {findQuestion, countUnique, print} = require("./generic/helpers");



const generateDiagnosticReport = (assessment, latestStudentResponse, studentName) => {

    // Get all strands name
    const strands = questionsData.map((item) => item.strand);

    // Count unique strands
    const strandsCounts = countUnique(strands)

    // get details by strand
    const getDetailsByStrand = (sc) => {
        let detailsByStrand = [];

        for (const key in strandsCounts) {
            if (key.toString().includes("correct answers")) {
                detailsByStrand.push(`${key}: ${sc[key]} our of ${sc[key.replace(" correct answers", "")]} correct`);
            }
        }

        return detailsByStrand;
    };

    if (latestStudentResponse) {
        const date = moment(latestStudentResponse.completed, "DD.MM.YYYY hh.mm.ss").format("Do MMMM gggg LT");

        const title = `${studentName} has completed ${assessment.name} assessment on ${date}`;

        // the number of right question
        const info = `He got ${latestStudentResponse.results.rawScore} questions right out of ${questionsData.length}.`;
        const subTitle = `${info} Details by strand given bellow`;

        // find the number of correct answers based on different strands
        for (const key in strandsCounts) {
            if (!key.toString().includes("correct answers")) {
                latestStudentResponse.responses.forEach(res => {
                    const question = findQuestion(res.questionId);
                    if (question && question.config.key === res.response && key === question.strand) {
                        strandsCounts[`${key} correct answers`] = strandsCounts[`${key} correct answers`] + 1;
                    }
                });
            }
        }

        const details = getDetailsByStrand(strandsCounts);

        return {title, subTitle, details}
    }
};

module.exports = generateDiagnosticReport
