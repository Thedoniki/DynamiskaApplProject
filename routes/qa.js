const routes = require("express").Router();
const dbService = require("../database/qadb");

//Ställ en fråga som en consumer
routes.post('/question/:username', async (req, res) => {//ställ en fråga
    try {
        console.log(req.body)
        let question = await dbService.addQuestion(req.body, req.params.username);
        res.json (question);
    }
    catch (error) {
        res.send("Nu gick det inte att lägga till en fråga");
    }
});



//Funktion för att hämta frågor för alla användare
routes.get('/questions/', async (req, res) => {
    try {
        const result = await dbService.getQuestions();
        
        res.json(result);
        return result;
    }
    catch (error) {
        console.log("Kunde inte hämta frågor");
    }
});

//uppdatera frågan som en consumer
routes.put('/question/:id', async (req, res) => {//updaterar fråga via id
    try {
        const question = await dbService.updateQuestion(req.params.id, req.body);
        res.send('Frågan ändrades')
    }
    catch (error) {
        res.send('Nu gick det inte att uppdatera Frågan');
    }
});

////////////////Answer start////////////////////

routes.post('/question/:id/answer/:username', async(req,res) =>{

    let body = {
        username:req.params.username,
        answerText:req.body.answerText
    }

    try {
        const answerQuestion = await dbService.addAnswer(req.params.id, body);
        console.log(answerQuestion);
        res.json(answerQuestion);
    } catch (error) {
        console.log('qa.js -> questions/answer/:id')
    }

});



routes.get('/question/:id', async(req,res) =>{


    try {
        const answerQuestion = await dbService.getAnswersForQuestion(req.params.id);
        console.log(answerQuestion);
        res.json(answerQuestion);
    } catch (error) {
        console.log('qa.js -> questions/:id')
    }

});


routes.delete('/question/:id', async (req, res) => {
    try {
        const question = await dbService.deleteQuestion(req.params.id);
        res.send("Frågan blev borttagen");
    }
    catch (error) {
        res.send("Gick inte att ta bort Frågan");
    }


});


module.exports = routes;
