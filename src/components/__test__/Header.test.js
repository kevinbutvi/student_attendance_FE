import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from "../Header"

afterEach(() => {
    cleanup();
})

test("should render Status button ", () => {
    render(<Header title={"Test-Title"} subtitle={"Test Subtitle"} />);
    const headerElement = screen.getByTestId("headerTest-Test-Title");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent("Test-Title");
    expect(headerElement).toHaveTextContent("Test Subtitle");
})