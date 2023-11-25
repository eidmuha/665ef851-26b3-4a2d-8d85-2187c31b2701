// Case 2
const studentResponsesData = require("./data/student-responses.json");
const {formatFullName} = require("./generic/helpers");
const moment = require("moment");

const generateProgressReport = (assessment, student) => {

    // get total student responses for the current student
    const tsAssessments = studentResponsesData.filter(ass => ass.student.id === student.id && ass.completed);

    const subTitle = `${formatFullName(student)} has completed ${assessment.name} assessment ${tsAssessments.length}`;
    console.log(`\n${subTitle} times in total. Date and raw score given below:\n`);

    // save raw scores, which will be used bellow to find the difference from the oldest assessment scores
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
        console.info(`${formatFullName(student)} got ${diff} more correct in the recent completed assessment than the oldest`);
    } else if (diff < 0) {
        console.info(`${formatFullName(student)} got ${minScore - maxScore} less correct in the recent completed assessment than the oldest`);
    } else {
        console.info(`${formatFullName(student)} got same correct in the recent completed assessment than the oldest`);
    }

    console.log("");
};

module.exports = generateProgressReport;
