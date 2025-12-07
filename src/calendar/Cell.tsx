import './Cell.sass'; 
import '../assets/Rubik.ttf';

import {
    useState,
} from 'react'

export const Cell = ({ date = 0, day = "", isodatestr = ""}) => {
    const [hovered, setHovered] = useState(false); 
    return (
        // XXX: do white-black container
        <> 
            <div className="container-black" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
                <div className={`add-ev-outer ${!hovered ? 'hidden' : ''}`}>
                    <button className="add-ev">+</button>
                </div>
                <div className="date">{date}</div>
                <div className="day">{day}</div>
            </div>
        </>
    )

}
