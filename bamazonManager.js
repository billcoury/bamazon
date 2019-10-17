//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gbv1fk88",
  database: "Bamazon"
})

function start(){
  inquirer.prompt([{
    type: "list",
    name: "doThing",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
  }]).then(function(ans){
     switch(ans.doThing){
      case "View Products for Sale": viewProducts();
      break;
      case "View Low Inventory": viewLowInventory();
      break;
      case "Add to Inventory": addToInventory();
      break;
      case "Add New Product": addNewProduct();
      break;
      case "End Session": console.log('Bye!');
    }
  });
}

//views all inventory
function viewProducts(){
  console.log('>>>>>>Viewing Products<<<<<<');

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].itemId + " | " + "Product: " + res[i].productName + " | " + "Department: " + res[i].departmentName + " | " + "price: " + res[i].price + " | " + "QTY: " + res[i].stockQuantity);
    console.log('--------------------------------------------------------------------------------------------------')
  }

  start();
  });
}

//views inventory lower than 5
function viewLowInventory(){
  console.log('>>>>>>Viewing Low Inventory<<<<<<');

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    if(res[i].stockQuantity <= 5){
    console.log("ID: " + res[i].itemId + " | " + "Product: " + res[i].productName + " | " + "Department: " + res[i].departmentName + " | " + "price: " + res[i].price + " | " + "QTY: " + res[i].stockQuantity);
    console.log('--------------------------------------------------------------------------------------------------');
    }
  }

  start();
  });
}

//displays prompt to add more of an item to the store and asks how much
function addToInventory(){
  console.log('>>>>>>Adding to Inventory<<<<<<');

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  var itemArray = [];
  //pushes each item into an itemArray
  for(var i=0; i<res.length; i++){
    itemArray.push(res[i].productName);
  }

  inquirer.prompt([{
    type: "list",
    name: "product",
    choices: itemArray,
    message: "Which item would you like to add inventory?"
  }, {
    type: "input",
    name: "qty",
    message: "How much would you like to add?",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
    }]).then(function(ans){
      var currentQty;
      for(var i=0; i<res.length; i++){
        if(res[i].productName === ans.product){
          currentQty = res[i].stockQuantity;
        }
      }
      connection.query('UPDATE Products SET ? WHERE ?', [
        {stockQuantity: currentQty + parseInt(ans.qty)},
        {productName: ans.product}
        ], function(err, res){
          if(err) throw err;
          console.log('The quantity was updated.');
          start();
        });
      })
  });
}

//allows manager to add a completely new product to store
function addNewProduct(){
  console.log('>>>>>>Adding New Product<<<<<<');
  var deptNames = [];

  //grab name of departments
  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;
    for(var i = 0; i<res.length; i++){
      deptNames.push(res[i].departmentName);
    }
  })

  inquirer.prompt([{
    type: "input",
    name: "product",
    message: "Product: ",
    validate: function(value){
      if(value){return true;}
      else{return false;}
    }
  }, {
    type: "list",
    name: "department",
    message: "Department: ",
    choices: deptNames
  }, {
    type: "input",
    name: "price",
    message: "price: ",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
  }, {
    type: "input",
    name: "quantity",
    message: "Quantity: ",
    validate: function(value){
      if(isNaN(value) == false){return true;}
      else{return false;}
    }
  }]).then(function(ans){
    connection.query('INSERT INTO Products SET ?',{
      productName: ans.product,
      departmentName: ans.department,
      price: ans.price,
      stockQuantity: ans.quantity
    }, function(err, res){
      if(err) throw err;
      console.log('Another item was added to the store.');
    })
    start();
  });
}

start();