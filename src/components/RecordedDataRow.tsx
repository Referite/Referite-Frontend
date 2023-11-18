import '../styles/RecordedDataRow.css';

interface RecordedDataRowProps {
    country: string;
    goldValue: number;
    silverValue: number;
    bronzeValue: number;
  }
  
  const RecordedDataRow: React.FC<RecordedDataRowProps> = ({ country, goldValue, silverValue, bronzeValue  }) => {

    const getMedalValueClass = (value: number, type: 'gold' | 'silver' | 'bronze') => {
      const baseClass = "medal-value";
      const typeClass = `${type}-medal-value`;
      const boldClass = value !== 0 ? "bold" : "";
      return `${baseClass} ${typeClass} ${boldClass}`;
    }

    return (
      <>
        <div className="recorded-country">{country}</div>
        <div className={getMedalValueClass(goldValue, 'gold')}>{goldValue}</div>
        <div className={getMedalValueClass(silverValue, 'silver')}>{silverValue}</div>
        <div className={getMedalValueClass(bronzeValue, 'bronze')}>{bronzeValue}</div>
        <label> &nbsp; </label>
      </>
    );
  };
  
  export default RecordedDataRow;
  