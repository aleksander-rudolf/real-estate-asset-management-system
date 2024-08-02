const express = require("express");
const cors = require("cors");
const db = require("../database.js");
const router = express.Router();

router.get("/view-all", (req, res) => {
	db.query("SELECT * FROM FINANCIAL_RECORD", (error, result) => {
	  	res.send(result);
	});
});



router.delete("/remove/:paramRecordNo/:paramP_PropertyNo", (req, res) => {
	const { paramRecordNo, paramP_PropertyNo } = req.params;
	db.query("DELETE FROM FINANCIAL_RECORD WHERE RecordNo = ? AND P_PropertyNo = ?", [paramRecordNo, paramP_PropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.get("/view/:paramRecordNo/:paramP_PropertyNo", (req, res) => {
   
	const { paramRecordNo, paramP_PropertyNo } = req.params;
	db.query("SELECT * FROM FINANCIAL_RECORD WHERE RecordNo = ? AND P_PropertyNo = ? ", [paramRecordNo,paramP_PropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.post("/add", (req, res) => {

    const { RecordNo, P_PropertyNo} = req.body;    
	var Expenses = ""; 
    var Monthly_Income = "";

    db.query("SELECT SUM(Expense) AS Total_expense FROM WORK_ORDER WHERE P_PropertyNo = ?", P_PropertyNo, (error1, result1)=> {
		if (error1) {
			console.log(error1);
		}
		if(result1[0].Total_expense == null){
			Expenses = "0";
		}
		else{
			Expenses = result1[0].Total_expense;
		}
		db.query("SELECT SUM(Rent) AS Total_rent FROM TENANT WHERE P_PropertyNo = ?",P_PropertyNo, (error2, result2)=> {
			if (error2) {
				console.log(error2);
			}
			Monthly_Income = result2[0].Total_rent;
			db.query("INSERT INTO FINANCIAL_RECORD (RecordNo, P_PropertyNo, Monthly_Income, Expenses) VALUES (?, ?, ?, ?)", 
				[RecordNo, P_PropertyNo, Monthly_Income, Expenses ] , (error3, result3) => {
					if (error3) {
						console.log(error3);
					}
			});
		});
	});
});

module.exports = router;