import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../posts/postsSlice";

export default function Search(){
    const [searchTerm,setSearchTerm] = useState('');
    const dispatch = useDispatch();
    function onSubmit(e){
        e.preventDefault();
        dispatch(searchPosts(searchTerm));
    }
    return (
        <form onSubmit={onSubmit} className="search">
            <input type="text" id="searchTerm" name="searchTerm" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            <input type="submit" value="Search"/>
        </form>
    )
}