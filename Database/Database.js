require('dotenv').config()
const mysql = require('mysql')

const DB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:`${process.env.DBpassword}`,
    database:'books'
})

DB.connect((err)=>{
    if(err){
        console.log({message: err.message})
    }


    console.log("CONNECTED TO DB")
})


module.exports = DB