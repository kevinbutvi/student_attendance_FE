import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyErrorMessage from "../MyErrorMessage"


afterEach(() => {
    cleanup();
})

test("should render error message", () => {
    const errorDetail = {code: 500, message: "An Error Occurred"};
    render(<MyErrorMessage errorMessage={errorDetail} />);
    const MyErrorMessageElement = screen.getByTestId("errorMessageTest");
    expect(MyErrorMessageElement).toBeInTheDocument();
    expect(MyErrorMessageElement).toHaveTextContent("An Error Occurred");

})