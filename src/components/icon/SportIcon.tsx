import { SportObject } from "../../interfaces/Sport";

function SportIcon({ rec, viewBox }: {rec: SportObject, viewBox: string}) {
  return (
    <div style={{ marginTop: '5px', width: '4vw' }}>
      {rec.sport_icon && rec.sport_icon.map((path, index) => (
        <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} xmlSpace="preserve">
          <path fill="#242752" d={path}></path>
        </svg>
      ))}
    </div>
  );
}

export default SportIcon;