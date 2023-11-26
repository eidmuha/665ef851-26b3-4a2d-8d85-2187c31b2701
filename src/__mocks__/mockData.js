const studentName = "Eddie Basharat";
const studentResponse = {
    id: 'studentReponse3',
    assessmentId: 'assessment1',
    assigned: '14/12/2021 10:31:00',
    started: '16/12/2021 10:00:00',
    completed: '16/12/2021 10:46:00',
    student: { id: 'student1', yearLevel: 5 },
    responses: [
        { questionId: 'numeracy1', response: 'option3' },
        { questionId: 'numeracy2', response: 'option4' },
        { questionId: 'numeracy3', response: 'option2' },
        { questionId: 'numeracy4', response: 'option2' },
        { questionId: 'numeracy5', response: 'option3' },
        { questionId: 'numeracy6', response: 'option3' },
        { questionId: 'numeracy7', response: 'option4' },
        { questionId: 'numeracy8', response: 'option4' },
        { questionId: 'numeracy9', response: 'option2' },
        { questionId: 'numeracy10', response: 'option2' },
        { questionId: 'numeracy11', response: 'option2' },
        { questionId: 'numeracy12', response: 'option2' },
        { questionId: 'numeracy13', response: 'option3' },
        { questionId: 'numeracy14', response: 'option1' },
        { questionId: 'numeracy15', response: 'option2' },
        { questionId: 'numeracy16', response: 'option1' }
    ],
    results: { rawScore: 15 }
};
const assessment = {
    "id": "assessment1",
    "name": "Numeracy",
    "questions": [
        {
            "questionId": "numeracy1",
            "position": 1
        }
    ]
};
const students = [
    {
        "id": "001",
        "firstName": "Tony",
        "lastName": "Stark",
        "yearLevel": 6
    },
    {
        "id": "002",
        "firstName": "Steve",
        "lastName": "Rogers",
        "yearLevel": 6
    },
];
const student = {
    "id": "student1",
    "firstName": "Eddie",
    "lastName": "Basharat",
    "yearLevel": 9
};

export {studentName, studentResponse, assessment, students, student};
