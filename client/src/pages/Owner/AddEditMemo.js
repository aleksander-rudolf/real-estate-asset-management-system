import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    MemoNo: "",
    P_PropertyNo: "",
    Message: "",
    O_SIN: "",
    PM_SIN: "",
};

function AddEditMemo(){

    const [state, setState] = useState(initialState);

    const {MemoNo, P_PropertyNo, Message, O_SIN, PM_SIN} = state;

    const navigate = useNavigate();

    const {paramMemoNo, paramP_PropertyNo} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/memo/view/${paramMemoNo}/${paramP_PropertyNo}`).then((response) => setState({ ...response.data[0] }));
    }, [paramMemoNo,paramP_PropertyNo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!MemoNo || !P_PropertyNo || !Message) {
        toast.error("Please provide value into each input field");
        } 
        else {
 
            if (!paramMemoNo) {
                Axios.post("http://localhost:3001/api/memo/add", {
                    MemoNo,
                    P_PropertyNo,
                    Message,
                    O_SIN,
                    PM_SIN,
                }).then(() => {
                    setState({MemoNo: "", P_PropertyNo: "", Message: "" , O_SIN: "", PM_SIN: ""});
                }).catch((err) => toast.error(err.response.data));
            } 
            else {
                Axios.put(`http://localhost:3001/api/memo/update/${paramMemoNo}/${paramP_PropertyNo}`, {
                    P_PropertyNo,
                    Message,
                    O_SIN,
                    PM_SIN,
                }).then(() => {
                    setState({MemoNo: "", P_PropertyNo: "", Message: "" , O_SIN: "", PM_SIN: ""});
                })
                .catch((err) => toast.error(err.response.data));
            }

        setTimeout(() => navigate("/owner/manage-memos"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "100px" }}>
        <form
            style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
            }}
            onSubmit={handleSubmit}
        >
            <label htmlFor="MemoNo">Memo No.</label>
            <input
                type="text"
                id="MemoNo"
                name="MemoNo"
                placeholder="Memo No..."
                value={MemoNo || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="P_PropertyNo">Property No.</label>
            <input
                type="text"
                id="P_PropertyNo"
                name="P_PropertyNo"
                placeholder="Property No..."
                value={P_PropertyNo || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Message">Message</label>
            <input
                type="text"
                id="Message"
                name="Message"
                placeholder="Message..."
                value={Message || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="O_SIN">Owner SIN</label>
            <input
                type="text"
                id="O_SIN"
                name="O_SIN"
                placeholder="Owner SIN..."
                value={O_SIN || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="PM_SIN">Property Manager SIN</label>
            <input
                type="text"
                id="PM_SIN"
                name="PM_SIN"
                placeholder="Property Manager SIN..."
                value={PM_SIN || ""}
                onChange={handleInputChange}
            />
            <input type="submit" value={MemoNo ? "Update" : "Save"} />
            <Link to="/owner/manage-memos">
            <input type="button" value="Go Back" />
            </Link>
        </form>
        </div>
    );
}

export default AddEditMemo;