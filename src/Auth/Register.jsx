import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../Api";
import axios from "axios";
export const Register = () => {
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "", lastName: "", Email: "", Password: "", C_Password: ""
    });
    const handlechange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }
    const validate = () => {
        if (userInfo.firstName === "" && userInfo.lastName === "" && userInfo.Email === "" && userInfo.Password === "" &&  userInfo.C_Password === "") {
            setErrors(" Please Enter all the fields....");
            return false;
        } else if (userInfo.firstName === "" || userInfo.lastName === "") {
            setErrors("Please Enter Name of Name....");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validate();
        if(valid){
            axios.post(`${API}/adduser`,userInfo).then((res) =>{
                if(res?.status === 200){
                    navigate('/Login');
                   return  setUserInfo({
                    firstName: "", lastName: "", Email: "", Password: "", C_Password: ""
                });
                }
            }
            ).catch((err)=>{
                return setErrors("Email already exists or something went wrong");
            })
        }
    }
    return (
        <div className="container p-2 mt-5 " style={{ width: "400px", height: "400px" }}>
            < form className="border p-3" >
                <div className="form-outline mb-4">
                    <label className="form-label">First Name</label>
                    <input type="text" value={userInfo?.firstName} name="firstName" onChange={(e) => handlechange(e)} className="form-control" />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" >Last Name</label>
                    <input type="text" value={userInfo?.lastName} name="lastName" onChange={(e) => handlechange(e)} className="form-control" />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label">Email address</label>
                    <input type="email" id="form2Example1" value={userInfo?.Email} name="Email" onChange={(e) => handlechange(e)} className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" value={userInfo?.Password} name="Password" onChange={(e) => handlechange(e)} className="form-control" />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" value={userInfo?.C_Password} name="C_Password" onChange={(e) => handlechange(e)} className="form-control" />
                </div>
                <div className="text-center m-2 text-danger">{errors}</div>
                <div className="d-flex justify-content-around" >
                    <button type="button" onClick={handleSubmit} className="btn btn-success btn-block">Register</button>
                    <Link to="/Login">
                        <button type="button" className="btn btn-primary btn-block">Login</button>
                    </Link>
                </div>
            </form >
        </div>

    )
}