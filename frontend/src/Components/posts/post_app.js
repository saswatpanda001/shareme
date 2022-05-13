import React,{createContext, useContext,useState,useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/posts/posts';
import Details from './Components/posts/details';
import Create from './Components/posts/create';
import UpdatePost from './Components/posts/update';
import Profile from './Components/basic/profile';
import HomeApp from './Components/basic/homeapp';

export const PostContext = createContext(null);

const App = () => { 
    const [postDetails,setPostDetails] = useState({loading:true,details:[]});
    return (
        <div>
        <PostContext.Provider value={{postDetails,setPostDetails}}>
        <Router>
            <Routes>
                <Route path="/shareme/posts" element={<Home></Home>}/>
                <Route path="/shareme/posts_create" element={<Create></Create>}/>
                <Route path="/shareme/posts/:id" element={<Details/>}/>
                <Route path="/shareme/posts/:id/update" element={<UpdatePost/>}/>
                <Route path="/shareme/profile" element={<Profile/>}/>
            </Routes>
        </Router> 
        </PostContext.Provider>
        </div>
    )
}
export default App;

