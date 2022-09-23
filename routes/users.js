const routes = require("express").Router();
const dbService = require("../database/usersdb");
const session = require('express-session');
routes.use(
    session({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false })
    );

 routes.get("/home/", (req, res) => {
   
  req.url;

  res.redirect("/home.html");
 });
 

routes.get('/users/', async(req,res) => {

  
    const allUsers = await dbService.getAllUsers();
  
    res.json(allUsers);
    return allUsers;


});



//add user
routes.post("/register", async (req, res) => {
  let data = {
    role: req.body.role,
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const regUser = await dbService.addUser(data);
    console.log(regUser);
    res.json({
      info: "User registerd in database",
    });
  } catch (error) {
   
    res.json("User could not be registerd");
  }
});


routes.post("/login/", async (req, res) => {
  try {
    const user = await dbService.doLogin(req.body);

    if (!user) {
      //console.log("User not found");
      res.sendStatus(404).send('Not found');
    } else {
        const userData = await dbService.getUserByUsername(req.body);
        
         res.json(userData);
      }
    
  } catch (error) {
    console.log("/login in users.js error");
  }
});





routes.get("/user/:username", async (req, res) => {
  let username = req.params.username;
  try {
    const user = await dbService.getUserByUsername(username);
    res.redirect('/api/home/');
    return user;
  } catch (error) {
    console.log("Error in users.js row 21.");
  }
})





routes.get("/logout/", (req, res) => {
  
  req.logOut;
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    userData = null;
    res.redirect("/index.html");
  });
});



module.exports = routes;
