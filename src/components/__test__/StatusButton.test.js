import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatusButton from "../StatusButton"


afterEach(() => {
    cleanup();
})

test("should render Status button ", () => {
    render(<StatusButton status={1} />);
    const StatusButtonElementPassed = screen.getByTestId("statusButtonText-1");
    expect(StatusButtonElementPassed).toBeInTheDocument();
    expect(StatusButtonElementPassed).toHaveTextContent("PASSED");

    render(<StatusButton status={0} />);
    const StatusButtonElementFailed = screen.getByTestId("statusButtonText-0");
    expect(StatusButtonElementFailed).toBeInTheDocument();
    expect(StatusButtonElementFailed).toHaveTextContent("FAILED");

})