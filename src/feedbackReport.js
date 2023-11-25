const {findQuestion, getAnswer, print} = require("./generic/helpers");
const moment = require("moment");
const questionsData = require("./data/questions.json");

const generateFeedbackReport = (assessment, latestAssessment, studentName) => {
    // check if there is any latest assessment
    if (latestAssessment) {
        const formattedDate = moment(latestAssessment.completed, "DD.MM.YYYY hh.mm.ss").format("Do MMMM gggg LT");

        // print basic assessment info
        print(`${studentName} has completed ${assessment.name} assessment on ${formattedDate}`);

        // print the number of right questions
        const message = "Feedback for wrong answers given below";
        console.info(`He got ${latestAssessment.results.rawScore} questions right out of ${questionsData.length}. ${message}\n`);

        // loop the current student response and find the question
        latestAssessment.responses.forEach(res => {
            const question = findQuestion(res.questionId);

            // if the given student response is incorrect, print feedback for the question
            if (question && question.config.key !== res.response) {
                const studentAnswer = getAnswer(question, res.response);
                const correctAnswer = getAnswer(question, question.config.key);

                print(`Question: ${question.stem}`);
                print(`Your answer: ${studentAnswer.label} with value ${studentAnswer.value}`);
                print(`Right answer: ${correctAnswer.label} with value ${correctAnswer.value}`);
                print(`Hint: ${question.config.hint}`);
            }
        });

        console.info("");
    }
};

module.exports = generateFeedbackReport;
