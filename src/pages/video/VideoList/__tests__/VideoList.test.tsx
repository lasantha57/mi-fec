import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

import VideoList from '..';

afterEach(cleanup)

describe('Testing VideoList', () => {
    it('Component should render correctly', () => {
        const tree = renderer
            .create(
                <Router>
                    <VideoList />
                </Router>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});