import renderer from 'react-test-renderer';
import RecordedDataRow from '../RecordedDataRow';

jest.mock('../RecordedDataRow', () => 'RecordedDataRow');
describe('RecordedDataRow Component', () => {
    it('renders correctly', () => {
      const countriesLst = ['Country1', 'Country2'];
      const onButtonClick = jest.fn();
      const onCountrySelect = jest.fn();
      const id = '1';
      const medalValues = {
          input1: '1',
          input2: '0',
          input3: '0'
      };
      const onMedalInputChange = jest.fn();
      const selectedCountry = 'Country1';
      const isNewRowAdded = false;

      const component = renderer.create(
        <RecordedDataRow
          countriesLst={countriesLst}
          onButtonClick={onButtonClick}
          onCountrySelect={onCountrySelect}
          id={id}
          medalValues={medalValues}
          onMedalInputChange={onMedalInputChange}
          selectedCountry={selectedCountry}
          isNewRowAdded={isNewRowAdded}
        />
      );
  
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });