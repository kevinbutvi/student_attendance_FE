import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Spinner from "../Spinner"


afterEach(() => {
    cleanup();
})

test("should render Spinner", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinnerTest");
    expect(spinnerElement).toBeInTheDocument();
})