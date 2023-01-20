import { API } from "../Api";
import { useNavigate ,useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
export const BookForm = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [bookInfo, setBookInfo] = useState({
        title: "",
        author: "",
        description: ""
    });
    const [errors, setErrors] = useState("");

    const getBookInfo = () => {
        axios.get(`${API}/getbooksinfo/${params._id}`).then((res) => {
            setBookInfo(res?.data.info);
        }).catch()
    }


    const resetForm = () => {
        if (params._id) {
            return getBookInfo();
        }
        setBookInfo("");
    };

    useEffect(() => {
        if (params._id) {
            getBookInfo();
        }
    }, [params._id]);
    const validate = () => {
        if (bookInfo.author === "" && bookInfo.description === "" && bookInfo.title === "") {
            setErrors(" Please Enter all the fields....");
            return false;
        } else if (bookInfo.author === "") {
            setErrors("Please Enter Name of Author....");
            return false;
        } else if (bookInfo.description === "") {
            setErrors("Please Enter Some brief info related to book.");
            return false;
        } else if (bookInfo.title === "") {
            setErrors("Please Enter the title of the book.");
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validate();
        let url = params._id ? "/editbookinfo" : "/addbookinfo" 
        
        if(valid){
            if( params._id ) {
                axios.put(`${API}${url}`, bookInfo)
                .then((res) => {
                    if(res.status === 200){
                        navigate('/Booklist');
                    }
                })
                .catch();
            }else{
                axios.post(`${API}${url}`, bookInfo)
                .then((res) => {
                    if(res.status === 200){
                        navigate('/Booklist');
                    }
                })
                .catch();
            }
           
        }
    }

    const handlechange = (e) => {
        const {name , value} = e.target;
        setBookInfo({...bookInfo , [name] : value});
    }

    return (
        <div className="container p-2 mt-5 " style={{ width: "400px", height: "400px" }}>
            <div>
                <h1>Enter Books Details</h1>
            </div>
            <form className="border p-3">
                <div className="mb-3">
                    <label className="form-label">Book Title</label>
                    <input type="text" name="title"    value={bookInfo.title || ""}  onChange={(e) => handlechange(e)} className="form-control" placeholder="Book Title" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" name="author" className="form-control" onChange={(e) => handlechange(e)} value={bookInfo.author || ""} placeholder="Name of author" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Book Discription</label>
                    <input type="text"  name="description" onChange={(e) => handlechange(e)} value={bookInfo.description || ""} className="form-control" />
                </div>
                <div className="d-flex justify-content-around" >
                    <button onClick={() => resetForm()} type="button" className="btn btn-danger btn-block">Reset</button>
                    <button onClick={(e) => handleSubmit(e)} type="submit" className="btn btn-success btn-block">Save</button>
                </div>
            </form>
        </div>
    )
}