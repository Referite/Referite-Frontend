import renderer from 'react-test-renderer';
import CountrySelector from '../CountrySelector';

jest.mock('../CountrySelector', () => 'CountrySelector');
describe('CountrySelector Component', () => {
    it('renders correctly', () => {
      const countriesLst = ['Country1', 'Country2'];
      const onCountrySelect = jest.fn();
  
      const selectedCountry = 'Country1';
  
      const component = renderer.create(
        <CountrySelector
          countriesLst={countriesLst}
          onCountrySelect={onCountrySelect}
          selectedCountry={selectedCountry}
        />
      );
  
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });