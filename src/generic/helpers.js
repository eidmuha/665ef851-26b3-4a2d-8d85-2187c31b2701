const studentResponsesData = require("../data/student-responses.json");
const questionsData = require("../data/questions.json");

// get student recent assessment.
// The latest assessment is checked against student year level
const getLatestStudentResponse = (assessment, studentId) => {
    let latestAssessment = null;
    studentResponsesData.filter(sResponse => {
        if (
            sResponse.student.id === studentId
            && sResponse.assessmentId === assessment.id
            && sResponse.completed
        ) {
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
};

// count unique items along with the keys
const countUnique = arr => {
    const counts = {};
    for (let i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        counts[`${arr[i]} correct answers`] = 0;
    }
    return counts;
};

// format full name, given a person object
const formatFullName = (person) => person.firstName && person.lastName
    ? `${person.firstName} ${person.lastName}`
    : person.firstName;

// get a question given question id
const findQuestion = (qId) => questionsData.find(q => q.id === qId);

// get a question's correct answer
const getAnswer = (question, key) => question.config.options.find(q => q.id === key);

// simple console output
const print = (output) => {
    console.info(output);
    return output;
}

module.exports = {getLatestStudentResponse, countUnique, formatFullName, findQuestion, getAnswer, print};
