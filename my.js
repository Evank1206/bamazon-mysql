const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();
// console.log(process.env);
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'bamazon'
});
// connection.connect( err =>{
//         if(err) throw err;
//         console.log(`connection connected: ${connection.threadId}`);
//     });
// see product list option function
seeProducts = () => {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;
        console.table(res);
        productID();
    });
}
// user choose the id of products function
productID = () => {
inquirer.prompt({
    name: 'quantity',
    type: 'input',
    message: 'Enter the number of products, You want to buy?!'
}).then(res => {
    console.log(res.quantity);
    connection.query(`SELECT * FROM products WHERE ?`, { id: res.quantity }, (err, result) => {
        if (err) throw err;
        //From here-----------------------------------------
        
        console.table(result.stock_quantity);
        //i moved everything from units() to here
        inquirer.prompt({
            name: 'unit',
            type: 'input',
            message: 'Enter how many units do you want?'
        }).then(res2 => {
            let number = res2.unit;
            connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: result.stock_quantity - number }, { id: res.quantity }], (err, res) => {
                if (err) throw err;
                console.log(res);
                // эндээс үргэлжилжилэх
                // connection.query(`SELECT * FROM products WHERE ?`, {price:res.unit}, (err, res) =>{
                //     if(err) throw err;
                //     console.log(res);
                // });
            })
        //to here------------------------------------------------------
            //units();
        });
    });
})
// unit of function
// units = () => {
//         });
// });
// bamazon welcome prompt
promptStart = () => {
    inquirer.prompt({
        name: 'bzon',
        type: 'list',
        message: 'WELCOME TO MY BAMAZON',
        choices: ['Would you like to see poducts?', 'Which Number of the product would like to buy?', 'How many unites would you like to buy?'],
    }).then(res => {
        // console.log(res);
        if (res.bzon == 'Would you like to see poducts?') {
            // see product list option function called here
            seeProducts();
        } else if (res.bzon == 'Which Number of the product would like to buy?') {
            productID();
        } else {
            units();
        }
    })
};