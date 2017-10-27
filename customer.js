var mysql = require('mysql');

var inquirer = require("inquirer");

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: ""
});


var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.query('SELECT * FROM products', function(err,result) {
    if(err) throw err;
    var table = [];
    for(var i = 0; i < result.length; i++) {
        var row = [result[i].id, result[i].product_name, result[i].department_name, result[i].price,result[i].stock_quantity];
        table.push(row);
    }
    console.table(["ID","Item", "Department", "Price", "Stock"],table);
    // console.log(table);
    customerPrompt();
});
function displayTable(table) {
    connection.query('SELECT * FROM ' + table, function(err,result) {
        if(err) throw err;
        var table = [];
        for(var i = 0; i < result.length; i++) {
            var row = [result[i].id, result[i].product_name, result[i].department_name, result[i].price,result[i].stock_quantity];
            table.push(row);
        }
        console.table(["ID","Item", "Department", "Price", "Stock"],table);
        connection.end();
    });
}

function customerPrompt() {
    inquirer.prompt([
            {
                name: 'itemID',
                type: 'input',
                message: 'What item would you like to buy? Enter item ID:'
            },
            {
                type: 'input',
                message: 'How many would you like to buy?',
                name: 'buyQuantity'
            }]).then(function(answer) {
                var buyItemID = answer.itemID;
                var buyQuantity = answer.buyQuantity;
                connection.query('SELECT price, department_name, stock_quantity FROM products WHERE ?', {id: buyItemID} , function(err,result) {
                    var price = result[0].price;
                    var quantity = result[0].stock_quantity;
                    var departmentName = result[0].department_name;
                    if(buyQuantity > quantity) {
                        console.log("==================== \nInsufficient Quantity!\n====================");
                        customerPrompt();
                    } else {
                        var newStockQuantity = parseInt(quantity) - parseInt(buyQuantity);
                        var totalSales = parseInt(price) * parseInt(buyQuantity);
                        console.log("\n\n+------------------+\n| PURCHASE DETAILS |\n+------------------+\n  Total Cost: " +totalSales + "\n  Number of Items Purchased: " + buyQuantity+"\n\n");
                        connection.query('UPDATE departments SET ? WHERE ?',[
                            {
                                total_sales: totalSales
                            },{
                                department_name: departmentName
                            }],
                            function(err,result) {return});
                        connection.query('UPDATE products SET ? WHERE ?', [
                            {stock_quantity: newStockQuantity},
                            {id: buyItemID}],
                            function(err,result) {
                                displayTable("products");
                        })

                    }

            })

                customerPrompt();
    })
}