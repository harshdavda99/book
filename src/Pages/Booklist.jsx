import { API } from "../Api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
export const Booklist = () => {
    const [booklist, setbooklist] = useState([]);
    const listbooks = () => {
        axios.get(`${API}/booklist`).then((res) => {
            if (res?.data?.list) {
               return setbooklist(res?.data?.list);
            }
        }
        )
            .catch((errors) => {
                console.log(errors)
            });
    }
    useEffect(() => {
        listbooks();
    }, [])

    
    const removebook = (id) => {
        axios.delete(`${API}/removebook/${id}`).then((res) => {
            if (res?.status === 200) {
                listbooks();
            }
        }
        )
            .catch((errors) => {
                console.log(errors)
            });
    }
    return (
        <div className="container p-2 mt-5 " style={{ width: "100%", height: "100%" }}>
            <div>
                <Link to="/BookForm">
                    <button type="button" className="btn btn-success btn-block mb-2 text-center">Add books</button>
                </Link>
            </div>
            <table className="table border" >
                <thead>

                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {booklist?.map((list, i) => {
                        return (
                            <tr>
                                <th scope="row">{list?._id}</th>
                                <td>{list?.title}</td>
                                <td>{list?.author}</td>
                                <td>{list.description}</td>
                                <td>
                                    <div className="d-flex justify-content-around" >
                                    <Link to={`/Editbook/${list?._id}`}>
                                            <button type="button" className="btn btn-secondary btn-block">edits</button>
                                        </Link>
                                        <button type="button" onClick={() => removebook(list?._id)} className="btn btn-danger btn-block">delete</button>
                                    </div>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}