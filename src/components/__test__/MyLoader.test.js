import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


import MyLoader from "../MyLoader"


afterEach(() => {
    cleanup();
})

test("should render Loader", () => {
    render(<MyLoader />);
    const loaderElement = screen.getByTestId("loaderTest");
    expect(loaderElement).toBeInTheDocument();
})