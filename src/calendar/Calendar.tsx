import {
} from '../auth/Auth.tsx'
import {
    Cell
} from './Cell.tsx'
import {
    createContext,
    useContext,
} from 'react'
import {
    startOfMonth,
    getDaysInMonth,
    addDays,
} from 'date-fns'
import './Calendar.sass'


const CalendarContext = createContext<Date>(new Date());

export const Calendar = () => {
    const ctx = useContext(CalendarContext);    
    let dateIt = new Date(startOfMonth(ctx));
    let elms = []
    for(let i = 1; i <= getDaysInMonth(dateIt); ++i) {
        elms.push(<>
                    <Cell 
                        date={i}
                        day={dateIt.toLocaleString("en-US", { weekday: "short" })}
                        isodatestr={dateIt.toISOString()}
                    />
                  </>)
        dateIt = addDays(dateIt, 1)
    }

    return (
        <>
            <div className="calendar">
                <div className="calendar-header">
                    <div className="calendar-container">
                        {elms.map((v)=>{return v;})}
                    </div>
                </div>
            </div>
        </>
    )
}

