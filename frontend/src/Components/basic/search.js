import React from 'react';
import { useContext,useState } from 'react';


const Search = () => {
  return (
    <div style={{display:"flex",alignItems:"center",marginRight:"3%"}}>
    <input class="form-control me-2"  style={{width:"150px"}} type="search" placeholder="Search" aria-label="Search"/>
    </div>
  );
};

export default Search;
