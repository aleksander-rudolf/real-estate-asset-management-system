import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Axios from "axios";
import "../Manage.css";

function ManageMemos(){

    const [data, setData] = useState([]);
    const {paramPM_SIN} = useParams();

    const loadData = async () => {
        await Axios.get(`http://localhost:3001/api/memo/view-all-pm/${paramPM_SIN}`).then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);

    const deleteMemo = (MemoNo, P_PropertyNo) => {
        if (window.confirm("Are you sure that you wanted to delete this memo?")) {
            Axios.delete(`http://localhost:3001/api/memo/remove/${MemoNo}/${P_PropertyNo}`);
            toast.success("Memo Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to={`/propertyManager/add-memo/${paramPM_SIN}`}>
                <button className="btn btn-add">Add Memo</button>
            </Link>
            <Link to={`/propertyManager/home/${paramPM_SIN}`}>
			    <button class="btn btn-back">Go Back</button>
			</Link>
        
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Memo No.</th>
                        <th style={{ textAlign: "center" }}>Property No.</th>
                        <th style={{ textAlign: "center" }}>Owner SIN</th>
                        <th style={{ textAlign: "center" }}>Property Manager SIN</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                        <tr key={item.MemoNo}>
                            <th scope="row">{item.MemoNo}</th>
                            <td>{item.P_PropertyNo}</td>
                            <td>{item.O_SIN}</td>
                            <td>{item.PM_SIN}</td>
                            <td>
                                <Link to={`/propertyManager/view-memo/${paramPM_SIN}/${item.MemoNo}/${item.P_PropertyNo}`}>
                                    <button className="btn btn-view">View</button>
                                </Link>
                                <Link to={`/propertyManager/edit-memo/${paramPM_SIN}/${item.MemoNo}/${item.P_PropertyNo}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteMemo(item.MemoNo, item.P_PropertyNo)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageMemos;