import { SportObject } from "../../interfaces/Sport";

function BeachVolleyballIcon({ rec, viewBox }: {rec: SportObject, viewBox: string}) {
  return (
    <div style={{marginTop: '5px', width: '4vw'}}>
        <circle cx="137.56" cy="261.55" r="2.5"></circle>
        <circle cx="137.56" cy="228.61" r="2.5"></circle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} xmlSpace="preserve">
            <circle cx="137.56" cy="261.55" r="2.5"></circle>
            <circle cx="137.56" cy="228.61" r="2.5"></circle>
            <circle cx="139.88" cy="279.62" r="2.5"></circle>
            <circle cx="155.21" cy="259.29" r="2.5"></circle>
            <circle cx="152.76" cy="228.61" r="2.5"></circle>
            <circle cx="178.68" cy="228.61" r="2.5"></circle>
            <circle cx="166.68" cy="228.61" r="2.5"></circle>
            <circle cx="153.7" cy="228.61" r="2.5"></circle>
            <circle cx="145.16" cy="228.61" r="2.5"></circle>
            <circle cx="159.66" cy="228.61" r="2.5"></circle>
            <circle cx="161.3" cy="228.61" r="2.5"></circle>
            <circle cx="129.96" cy="228.61" r="2.5"></circle>
            <circle cx="173.24" cy="228.61" r="2.5"></circle>
            <path fill="#242752" d={rec.sport_icon[0]}></path>
            <circle cx="192.52" cy="226.06" r="2.5"></circle>
            <circle cx="188.32" cy="241.36" r="2.5"></circle>
            <circle cx="177.89" cy="259.44" r="2.5"></circle>
            <circle cx="374.04" cy="262.23" r="2.5"></circle>
            <circle cx="315.68" cy="262.64" r="2.5"></circle>
            <circle cx="124.68" cy="268.98" r="2.5"></circle>
            <circle cx="311.48" cy="277.94" r="2.5"></circle>
            <circle cx="337.32" cy="258.86" r="2.5"></circle>
            <circle cx="325.31" cy="284.73" r="2.5"></circle>
            <circle cx="326.1" cy="244.56" r="2.5"></circle>
            <path fill="#242752" d={rec.sport_icon[1]}></path>
            <circle cx="393.89" cy="252.38" r="2.5"></circle>
            <circle cx="389.24" cy="267.79" r="2.5"></circle>
            <circle cx="379.32" cy="235.02" r="2.5"></circle>
            <path fill="#242752" d={rec.sport_icon[2]}></path>
            <circle cx="330.76" cy="306.34" r="2.5"></circle>
            <circle cx="351.24" cy="260.19" r="2.5"></circle>
            <circle cx="366.44" cy="242.45" r="2.5"></circle>
            <circle cx="364.11" cy="224.38" r="2.5"></circle>
            <circle cx="110.1" cy="251.62" r="2.5"></circle>
            <circle cx="114.75" cy="236.21" r="2.5"></circle>
            <circle cx="366.44" cy="275.39" r="2.5"></circle>
            <circle cx="348.78" cy="244.71" r="2.5"></circle>
            <circle cx="358.84" cy="298.2" r="2.5"></circle>
            <circle cx="350.3" cy="273.15" r="2.5"></circle>
            <circle cx="342.7" cy="293.5" r="2.5"></circle>
            <circle cx="344.34" cy="226.32" r="2.5"></circle>
        </svg>
    </div>
  )
}

export default BeachVolleyballIcon