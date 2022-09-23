
// require sqlite to be able to use CRUD-OPERATIONS on our database
const dbPromise = require('./dbSetup');
const bcrypt = require('../crypt.js');




const getAllUsers = async() => {

    try {
        const dbCon = await dbPromise;
        const users = await dbCon.all("SELECT * FROM users");
        return users;
    } catch (error) {
        console.log('Something went wrong in the getUserByUsername function in users db.')
    }
};



const getUserByUsername = async(data) => {

    try {
        const dbCon = await dbPromise;
        const user = await dbCon.get("SELECT * FROM users WHERE username = ?", [data.username]);

        return user;
    } catch (error) {
        console.log('Something went wrong in the getUserByUsername function in users db.')
    }
};


const addUser = async (data) => {
    try {
        status = 'Active';
        const sqlQuery = 'INSERT INTO users ( role, username, password,status ) VALUES (?,?,?,?)';
        const db = await dbPromise;
        let create = await bcrypt.createPassword(data.password);
        return db.run(sqlQuery, data.role, data.username,  create, status);
    } catch (error) {
        //throw new Error(error);
        console.log('Error when tryinf to add user in the usersdb.js')
    }
}

//LOGIN METHOD
const doLogin = async (data)=>{
    try{
        const dbCon = await dbPromise;
        const login = await dbCon.get("SELECT password FROM users WHERE username= ?",[data.username]);
        compares = await bcrypt.compPass(data.password, login.password);
  
        if(!compares){
            return false;
        }else{
            return compares;
        }
         
    }
    catch(error){
        console.log("Wrong credentials, check username and password.");
        return false;
    }
}

module.exports = {

    getAllUsers:getAllUsers,
    getUserByUsername:getUserByUsername,
    addUser: addUser,
    doLogin:doLogin

};