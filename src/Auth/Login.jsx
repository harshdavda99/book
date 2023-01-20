import axios from "axios";
import { API } from "../Api";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
export const Login = () => {
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        Email: "", Password: "",
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }
    const validate = () => {
        if (userInfo.Email === "" && userInfo.Password === "") {
            setErrors(" Please Enter all the fields....");
            return false;
        } else if (userInfo.Email === "") {
            setErrors("Please Enter Email.");
            return false;
        } else if (userInfo.Password === "") {
            setErrors("Please Enter the Password.");
            return false;
        } else {
            return true;
        }
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const valid = validate();
        if(valid){
            axios.post(`${API}/loginuser`,userInfo).then((res) => {
                console.log(res);
                if(res.status === 200 ){
                    navigate('/Booklist')
                }
            }).catch((err) => {
            //   setErrors()
            });
        }
    }
    return (
        <div className="container p-2 mt-5" style={{ width: "400px", height: "400px" }}>

            < form className="border p-3" >
                <div className="form-outline mb-4">
                    <label className="form-label" >Email address</label>
                    <input type="email" value={userInfo.Email || ""} name="Email" onChange={(e) => handlechange(e)} className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" value={userInfo.Password || ""} name="Password" onChange={(e) => handlechange(e)} className="form-control" />
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>
                <div className="d-flex justify-content-around" >
                    <button type="button" onClick={handlesubmit} className="btn btn-success btn-block">Login</button>
                    <Link to="/Register">
                        <button type="button" className="btn btn-primary btn-block">Register</button>
                    </Link>
                </div>
            </form >
        </div>

    )
}