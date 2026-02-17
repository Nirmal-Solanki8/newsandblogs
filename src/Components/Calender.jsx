import './calender.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight , faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Calender = () => {
    const dayofweek = ['Sun' , 'Mon' , "Tue",'Wed', 'Thu' ,'Fri', 'Sat'];
    const monthofyear =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currdate = new Date()
    const [currmonth, setcurrmonth] =useState(currdate.getMonth());
    const [curryear , setcurryear] = useState(currdate.getFullYear());

    const dayinmonth = new Date(curryear ,currmonth + 1 ,0 ).getDate();
    const firstdayofmonth = new Date(curryear , currmonth , 1).getDay();

    const prevmonth = () => {
        setcurrmonth((prevmonth) => (prevmonth === 0 ? 11 : prevmonth - 1))
        setcurryear((prevyear) => (currmonth === 0 ? prevyear -1 : prevyear))
    }
    const nextmonth = () => {
        setcurrmonth((prevmonth) => (prevmonth === 11 ? 0 : prevmonth + 1))
        setcurryear((prevyear) => (currmonth === 11 ? prevyear + 1 : prevyear))
    }
  return (
    <><div className='Calender'>
        <div className='navigate'>
            <h2 className='month'>{monthofyear[currmonth]}</h2>
            <h2 className='year'>{curryear}</h2>
            <div className="button">
                <FontAwesomeIcon className='icon' icon={faArrowLeft} onClick={prevmonth} />
                <FontAwesomeIcon className='icon' icon={faArrowRight} onClick={nextmonth}/>
            </div>
        </div>
        <div className='weekdays'>
            {dayofweek.map((day) => (
                <span key={day} >{day}</span>
            ))}
        </div>
        <div className='days'>
            {[...Array(firstdayofmonth).keys()].map((_, index) =>(
                <span key={`empty+ ${index}`}></span>
            ))}
            {[...Array(dayinmonth).keys()].map((day)=> (
            <span key={day+1} className={
                day + 1 === currdate.getDate() &&
                currmonth === currdate.getMonth() &&
                curryear === currdate.getFullYear() ?
                'Selected-Date' : ''
            } >{day + 1}</span>
            ))}
        </div>
    </div></>
  )
}

export default Calender