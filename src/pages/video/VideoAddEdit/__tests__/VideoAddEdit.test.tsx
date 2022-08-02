import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

import VideoAddEdit from '..';

afterEach(cleanup)

describe('Testing VideoAddEdit', () => {
    it('Component should render correctly', () => {
        const tree = renderer
            .create(
                <Router>
                    <VideoAddEdit />
                </Router>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Test Edit mode', () => {
        it('With authorId and videoId urls params should render as Edit Video page', async () => {
        
            jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => key);
    
            const { getByTestId } = render(
                <Router>
                    <VideoAddEdit />
                </Router>
            );
    
            const field = getByTestId('page-title') as HTMLInputElement;
            expect(field).toBeInTheDocument();
            expect(field.textContent).toBe('Edit Video: ');
        });

        it('Without authorId and videoId urls params should render as Add Video page', async () => {
        
            const { getByTestId } = render(
                <Router>
                    <VideoAddEdit />
                </Router>
            );
    
            const field = getByTestId('page-title') as HTMLInputElement;
            expect(field).toBeInTheDocument();
            expect(field.textContent).toBe('Add Video');
        });
    });

    describe('Test state changes', () => {
        it('Inputing text into video name textField should update the state for name', async () => {
        
            jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => key);
    
            const { getByTestId } = render(
                <Router>
                    <VideoAddEdit />
                </Router>
            );
    
            const field = getByTestId('video-name').querySelector('input') as HTMLInputElement;
            expect(field).toBeInTheDocument();
    
            fireEvent.change(field , { target: { value: 'new video name'}});
            expect(field.value).toBe('new video name');
            
            const pageTitle = getByTestId('page-title') as HTMLInputElement;
            expect(pageTitle.textContent).toBe('Edit Video: new video name');
        });
    })
});