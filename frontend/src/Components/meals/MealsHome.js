import React,{useEffect,useState} from 'react';
import MealCard from './MealCard';
import Loading from '../basic/loading';
import MealList from './MealList';
import AxiosRequest from '../../axios';

const MealsHome = () => {

  const [mealDetails,setMealDetails] = useState({loading:true,mealArray:[]});
  const [toggle,setToggle] = useState({list:true,data:"List"})
  const [searhMeal,setMealSearch] = useState("");
  

  const getMeals = async() => {
    const FetchMealDetails = await fetch('http://localhost:8000/khabar/meals',{"search":searhMeal})
    const CleanedMealDetails = await FetchMealDetails.json()
    setMealDetails({loading:false,mealArray:CleanedMealDetails})
  
  }


  useEffect(() => {
    getMeals();
  },[]);

  const {loading,mealArray} = mealDetails
  
  


  const RenderMeals = mealArray.map((each) => {
      return(
        <div key={each.id}>
          <MealCard passMealDetails={each}/>
        </div>
      );
  })

  const MealCardView = () => {
    return(
      <div  align="center" className='container' style={{marginTop:"2%","display":"grid","gridTemplateColumns": "repeat(auto-fit, minmax(200px, 1fr))"}}>
          {RenderMeals}
      </div>
    );
  }




  const handleToggle = () => {
      if(toggle.list === true){
        setToggle({list:false,data:"Card"})
      }
      else{
        setToggle({list:true,data:"List"})
      }

  }

  const ToggleButton = <div>
                        <button className='btn btn-dark' onClick={handleToggle}>Toggle {toggle.data} view</button>
                      </div>

  if(loading === false){
  return(
    
    <div className='container mt-3'>
      <div className='d-flex' style={{gap:"25px"}}>
      {ToggleButton}
      <div style={{display:"flex",alignItems:"center"}}>
                <input type="search"  class="form-control mr-2"  placeholder="Search" style={{width:"150px"}} onChange={(e) => {setMealSearch(e.target.value)}} />
      </div>
      </div>

     {toggle.list ?  <MealList passMealDetails={mealArray}/> : <MealCardView/>}
      
    </div>
  );
  }
  else{
    return(<Loading/>);

  }
}


export default MealsHome;
