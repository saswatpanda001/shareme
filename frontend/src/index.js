import React from "react";
import ReactDOM from 'react-dom'
import App from "./app";
import './index.css'
import { Provider } from "react-redux";
import ReduxCentralStore from "./Components/Redux/ReduxTutorial";

const Main = () => {
    return(
        <div><App/></div>
    );
}
ReactDOM.render( <Provider store={ReduxCentralStore}> <Main/> </Provider>,document.getElementById("root"))