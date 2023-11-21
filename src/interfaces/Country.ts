export interface SelectedCountry {
    id: string;
    country: string;
}


export interface CountrySelectorProps {
    medalValues: {
        input1: string;
        input2: string;
        input3: string;
      };
    countriesLst: any;
    onCountrySelect: any;
    id: any; 
    onButtonClick: any;
    onMedalInputChange: any;
    selectedCountry: any;
    isNewRowAdded: any;
}