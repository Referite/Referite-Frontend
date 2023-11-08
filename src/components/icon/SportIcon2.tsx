import { SportObject } from "../../interfaces/Sport";

function SportIcon2({ rec, viewBox }: {rec: SportObject, viewBox: string}) {
  return (
    <div style={{marginTop: '5px', width: '4vw'}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} xmlSpace="preserve">
            {rec.sport_icon && rec.sport_icon[0] && (
                <path fill="#242752" d={rec.sport_icon[0]}></path>
            )}
            {rec.sport_icon && rec.sport_icon[1] && (
                <path fill="#242752" d={rec.sport_icon[1]}></path>
            )}
        </svg>
    </div>
  )
}

export default SportIcon2