const express = require("express");
const cors = require("cors");
const db = require("../database.js");
const router = express.Router();

router.get("/view-all", (req, res) => {
	db.query("SELECT * FROM MEMO", (error, result) => {
	  	res.send(result);
	});
});

router.get("/view-all-pm/:paramPM_SIN", (req, res) => {
	const { paramPM_SIN } = req.params;
	db.query("SELECT * FROM MEMO WHERE PM_SIN = ?", paramPM_SIN, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.get("/view-all-t/:paramT_SIN", (req, res) => {
	const { paramT_SIN } = req.params;
	db.query("SELECT * FROM TENANT WHERE SIN = ?", paramT_SIN, (error, result) => {
		if (error) {
			console.log(error);
		}
        db.query("SELECT * FROM MEMO WHERE P_PropertyNo = ?", result[0].P_PropertyNo, (error, result1) => {
            if (error) {
                console.log(error);
            }
            res.send(result1);
        });
	});
});

router.delete("/remove/:paramMemoNo/:paramP_PropertyNo", (req, res) => {
	const { paramMemoNo , paramP_PropertyNo} = req.params;
	db.query("DELETE FROM MEMO WHERE MemoNo = ? AND P_PropertyNo = ?", [paramMemoNo,paramP_PropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.get("/view/:paramMemoNo/:paramP_PropertyNo", (req, res) => {
	const { paramMemoNo , paramP_PropertyNo} = req.params;
	db.query("SELECT * FROM MEMO WHERE MemoNo = ? AND P_PropertyNo = ?", [paramMemoNo,paramP_PropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.post("/add", (req, res) => {
	const {MemoNo, P_PropertyNo, Message, O_SIN, PM_SIN} = req.body;
	db.query("INSERT INTO MEMO (MemoNo, P_PropertyNo, Message, O_SIN, PM_SIN) VALUES (?, ?, ?, ?, ?)", 
			[MemoNo, P_PropertyNo, Message, O_SIN, PM_SIN], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.post("/add-pm/:paramPM_SIN", (req, res) => {
	const { paramPM_SIN } = req.params;
	const {MemoNo, P_PropertyNo, Message, O_SIN, PM_SIN} = req.body;
	db.query("SELECT PropertyNo FROM  PROPERTY WHERE PM_SIN = ? AND PropertyNo = ?", [paramPM_SIN, P_PropertyNo] , (error, result) => {
		if(result.length > 0){
			db.query("INSERT INTO MEMO (MemoNo, P_PropertyNo, Message, O_SIN, PM_SIN) VALUES (?, ?, ?, ?, ?)", 
					[MemoNo, P_PropertyNo, Message, O_SIN, paramPM_SIN], (error_2, result_2) => {
		        if (error_2) {
			       console.log(error_2);
		        }
			});	
       }
    });
});

router.put("/update/:paramMemoNo/:paramP_PropertyNo", (req, res) => {
    const { paramMemoNo , paramP_PropertyNo} = req.params;;
    const {P_PropertyNo, Message, O_SIN, PM_SIN} = req.body;
    db.query("UPDATE MEMO SET P_PropertyNo = ?, Message = ?, O_SIN = ?, PM_SIN = ? WHERE MemoNo = ? AND P_PropertyNo = ?", 
			[P_PropertyNo, Message, O_SIN, PM_SIN, paramMemoNo, paramP_PropertyNo ], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
    });
});

router.put("/update-pm/:paramPM_SIN/:paramMemoNo/:paramP_PropertyNo", (req, res) => {
    const {paramPM_SIN, paramMemoNo, paramP_PropertyNo} = req.params;
    const {P_PropertyNo, Message, O_SIN, PM_SIN} = req.body;
	db.query("SELECT PropertyNo FROM  PROPERTY WHERE PM_SIN = ? AND PropertyNo = ? ",[paramPM_SIN, P_PropertyNo],  (error, result) => {
		if(result.length>0){    
	        db.query("UPDATE MEMO SET P_PropertyNo = ?, Message = ?, O_SIN = ?, PM_SIN = ? WHERE MemoNo = ? AND P_PropertyNo = ?", 
			[P_PropertyNo, Message, O_SIN, PM_SIN, paramMemoNo, paramP_PropertyNo], (error_2, result_2) => {
		        if (error_2) {
			       console.log(error_2);
		        }
		        res.send(result_2);
	       });	
        }
    });
});	

module.exports = router;