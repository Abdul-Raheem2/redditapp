import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../posts/postsSlice";

export default function Search(){
    const [searchTerm,setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function onSubmit(e){
        e.preventDefault();
        navigate('/posts');
        dispatch(searchPosts(searchTerm));
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" id="searchTerm" name="searchTerm" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            <input type="submit" value="Search"/>
        </form>
    )
}