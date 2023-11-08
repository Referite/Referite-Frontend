import { SportObject } from "../../interfaces/Sport";

function CeremoniesIcon({ rec, viewBox }: {rec: SportObject, viewBox: string}) {
  return (
    <div style={{marginTop: '5px', marginBottom: 'auto', width: '4vw'}}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox={viewBox} xmlSpace="preserve" className="white "> 
            <g className="emblem"> 
                {rec.sport_icon && rec.sport_icon[0] && (
                    <path d={rec.sport_icon[0]} fill="#242752">
                    </path>
                )}
                {rec.sport_icon && rec.sport_icon[1] && (
                    <path d={rec.sport_icon[1]} fill="#242752">
                    </path>
                )}
            </g>
        </svg>
    </div>
  )
}

export default CeremoniesIcon;