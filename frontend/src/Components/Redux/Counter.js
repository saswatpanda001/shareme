import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CounterActions } from './ReduxTutorial';

const ReduxCounter = () => {
  

  const CounterData = useSelector((state) => state.days)
  const CounterToggle =useSelector(state => state.board)
  const Dispatch =  useDispatch()
  
  const CounterBoard = () => {
    return(
      <div>
        <div className={classes.value}>{CounterData}</div>
      </div>
    );
  }




  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {CounterToggle && <CounterBoard/>}
      <div className='d-flex justify-center gap-1' style={{marginTop:"4%"}}>
      <button className='btn btn-dark' onClick={() => {Dispatch(CounterActions.increment())}}>Increase</button>
      <button className='btn btn-dark' onClick={() => {Dispatch(CounterActions.increment(5))}}>Increase5</button>
      <button className='btn btn-dark' onClick={() =>  {Dispatch(CounterActions.increment(10))}}>Increase10</button>
      <button className='btn btn-dark' onClick={() => {Dispatch(CounterActions.decrement())}}>Decrease</button>
      <button className='btn btn-dark' onClick={() => {Dispatch(CounterActions.toggle())}}>Operate</button>
      </div>
    </main>
  );

}
export default ReduxCounter;
