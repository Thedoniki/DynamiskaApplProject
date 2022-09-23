
// require sqlite to be able to use CRUD-OPERATIONS on our database
const dbPromise = require('./dbSetup');

//////////////QUESTION START /////////////////////


const addQuestion = async (question,username) => {
    
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`INSERT INTO question (qTitle, qText,qCategory, username) VALUES(?,?,?,?)`, [question.qTitle,question.qText,question.qCategory,username]);
        return { status: "ok!"};
    }
    catch(error) {
        throw new Error(error);
    }
}

const updateQuestion = async (id, data) => {
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`UPDATE question SET qTitle=?, qText=?, qCategory=? WHERE qID=?`, [data.qTitle, data.qText,data.qCategory,id]);
        return 'question is now updated';
    }
    catch (error) {
        throw new Error(error)
    }
}

// const deleteQuestion = async (id) => {
//     try {
//         const dbCon = await dbPromise;
//         await dbCon.run("DELETE FROM question WHERE qID=?", [id]);
//         return {status: 'question is now deleted form the database'};
//     }
//     catch (error) {
//         throw new Error(error);
//     }
// };


const getQuestionsByUsername = async (username) => {
    //returnera produkter
    try {
        const dbCon = await dbPromise;
        const questions = await dbCon.all('SELECT * FROM question WHERE username=? ORDER by date ASC', [username])

        return questions;
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
};


const getQuestionsByCategory = async (category) => {
    //returnera produkter
    try {
        const dbCon = await dbPromise;
        const questions = await dbCon.all('SELECT * FROM question WHERE qCategory=?', [category])

        return questions;
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
};


const getQuestions = async (category) => {
    //returnera produkter
    try {
        const dbCon = await dbPromise;
        const questions = await dbCon.all('SELECT * FROM question ')

        return questions;
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
};


const deleteQuestion = async(id)=>{
    try {
        const dbCon = await dbPromise;
        const question = await dbCon.run('DELETE * FROM question where qID=? ',[id]);

        return question;
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
}
//////////////QUESTION END /////////////////////

//////////////ANSWERS START /////////////////////


const addAnswer = async (questionID,answer) => {
    
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`INSERT INTO answer (questionID,username,answerText) VALUES(?,?,?)`, [questionID,answer.username,answer.answerText]);
        return { status: "ok!"};
    }
    catch(error) {
        throw new Error(error);
    }
};



///requesta
const getAnswersForQuestion = async (qID,questionID) => {
    //returnera produkter
    try {
        const dbCon = await dbPromise;
        const questions = await dbCon.all('SELECT * FROM question , answer WHERE question.qID = answer.questionID ', [qID]);
        const answers = await dbCon.all('SELECT * FROM answer WHERE questionID=?',[qID]);
        

       console.log(questions);
       return questions;
        
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
};


//////////////ANSWERS END /////////////////////




module.exports = {

    addQuestion:addQuestion,
    updateQuestion:updateQuestion,
    deleteQuestion:deleteQuestion,
    getQuestionsByUsername:getQuestionsByUsername,
    getQuestionsByCategory:getQuestionsByCategory,
    addAnswer:addAnswer,
    getAnswersForQuestion:getAnswersForQuestion,
    getQuestions:getQuestions,
    


};