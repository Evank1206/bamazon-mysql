const inquirer = require("inquirer");
const mysql = require("mysql");

require('dotenv').config();

// console.log(process.env);

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: process.env.PASSWORD,
    database: "bamazon"
});

connection.connect( err =>{
        if(err) throw err;
        console.log(`connection connected: ${connection.threadId}`);
    });
// see product list option function 
seeProducts = () =>{
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        productID();
        
});
}
// user choose the id of products function
productID = () =>{
    inquirer.prompt({
        name: "quantity",
        type: "input",
        message: "Enter the number of products, You want to buy?!"
    }).then( res => {
        // console.log(res.quantity);
        connection.query(`SELECT * FROM products WHERE ?`, {id:res.quantity}, (err, result) => {
            // var number = res.quantity;
            if (err) throw err;
            if(result <= 0 || result >= 10){
                console.log("(^o^) W-T-F lol try again!(*<>*)");
                productID();
            }else{
                console.table(result);
                units(res.quantity);
            } 
        });
    });
}
// unit of function
units = (num) =>{
    inquirer.prompt({
        name: "unit",
        type: "input",
        message: "Enter how many units do you want?"
    }).then(res => {
        // console.log(res.unit);
        connection.query(`SELECT stock_quantity FROM products WHERE ?`, {id:num}, function(err, result){
            if(err) throw err;
            console.table(result);
        // connection.query('UPDATE stock_quantity SET ? WHERE ?', {id:num} * {id:res.unit},  (err, res) => {
        //     if (err) throw err;
        //     console.log(res);
        //     }); 

        });
    });
};

// bamazon welcome prompt
promptStart = () =>{
    inquirer.prompt({
        name:"bzon",
        type: "list",
        message: "WELCOME TO MY BAMAZON",
        choices:["Would you like to see poducts?","Which Number of the product would like to buy?", "How many unites would you like to buy?"],
    }).then( res =>{
        // console.log(res);
        if(res.bzon == "Would you like to see poducts?"){
            // see product list option function called here
            seeProducts();
        }else if(res.bzon == "Which Number of the product would like to buy?"){
            productID();
        }else{
            units();
        }
        
    })

};
promptStart();


