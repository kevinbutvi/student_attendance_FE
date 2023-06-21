import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProgressCircle from "../ProgressCircle"


afterEach(() => {
    cleanup();
})

test("should render Progress Circle", () => {
    render(<ProgressCircle progress={50} size={30} />);
    const ProgressCircleElement = screen.getByTestId("progressCircleTest-50");
    expect(ProgressCircleElement).toBeInTheDocument();
})