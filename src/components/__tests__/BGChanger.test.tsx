import renderer from 'react-test-renderer';
import BGChanger from '../BGChanger';

jest.mock('../BGChanger', () => 'BGChanger');
describe('BGChanger Component', () => {
    it('renders correctly', () => {
      const component = renderer.create(
        <BGChanger />
      );
  
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });