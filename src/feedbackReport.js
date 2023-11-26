const {findQuestion, getAnswer, print} = require("./generic/helpers");
const moment = require("moment");
const questionsData = require("./data/questions.json");

const generateFeedbackReport = (assessment, latestStudentResponse, studentName) => {
    // check if there is any latest assessment
    if (latestStudentResponse) {
        const formattedDate = moment(latestStudentResponse.completed, "DD.MM.YYYY hh.mm.ss").format("Do MMMM gggg LT");

        // basic assessment info
        const title = `${studentName} has completed ${assessment.name} assessment on ${formattedDate}`;

        // print the number of right questions
        const subText = "Feedback for wrong answers given below";
        const subTitle = `He got ${latestStudentResponse.results.rawScore} questions right out of ${questionsData.length}. ${subText}`;

        // feedback details
        let details = [];
        // loop the current student response and find the question
        latestStudentResponse.responses.forEach(res => {
            const question = findQuestion(res.questionId);

            // if the given student response is incorrect, print feedback for the question
            if (question && question.config.key !== res.response) {
                const studentAnswer = getAnswer(question, res.response);
                const correctAnswer = getAnswer(question, question.config.key);

                details.push(`Question: ${question.stem}`);
                details.push(`Your answer: ${studentAnswer.label} with value ${studentAnswer.value}`);
                details.push(`Right answer: ${correctAnswer.label} with value ${correctAnswer.value}`);
                details.push(`Hint: ${question.config.hint}\n`);
            }
        });

        if (details.length === 0) {
            details = ["No feedback found"]
        }

        return {title, subTitle, details};
    }
};

module.exports = generateFeedbackReport;
