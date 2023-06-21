import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyModal from "../MyModal"


afterEach(() => {
    cleanup();
})

test("should render Modal error message", () => {
    render(<MyModal title={"ThereWasAndError"} description={"Error Description"} />);
    const myModalElement = screen.getByTestId("MyModalTest-ThereWasAndError");
    expect(myModalElement).toBeInTheDocument();
    expect(myModalElement).toHaveTextContent("ThereWasAndError");
    expect(myModalElement).toHaveTextContent("Error Description");

})