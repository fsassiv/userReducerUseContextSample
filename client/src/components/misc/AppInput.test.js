import AppInput from "./AppInput.jsx";

describe("AppInput", () => {
  const mockChange = jest.fn();
  const defaultProps = {
    inputPlaceholder: "Digite aqui",
    handleChange: mockChange,
    inputValue: ""
  };
  describe("AppInput [text]", () => {
    const inputType = { inputTarget: "text" };

    const appInput = shallow(<AppInput {...defaultProps} {...inputType} />);

    it("rendered correctly", () => {
      expect(appInput).toMatchSnapshot();
    });

    describe("when typing into the AppInput...", () => {
      beforeEach(() => {
        appInput
          .find(".appInput")
          .simulate("change", { target: { value: "Texto teste" } });
      });

      it("call 'handleChange' callback", () => {
        expect(mockChange).toHaveBeenCalled();
      });
    });
  });

  describe("AppInput [password]", () => {
    const inputType = { inputTarget: "password" };
    const appInput = shallow(<AppInput {...defaultProps} {...inputType} />);

    it("rendered correctly", () => {
      expect(appInput).toMatchSnapshot();
    });

    describe("when typing into the AppInput...", () => {
      beforeEach(() => {
        appInput
          .find(".appInput")
          .simulate("change", { target: { value: "senha" } });
      });

      it("call 'handleChange' callback", () => {
        expect(mockChange).toHaveBeenCalled();
      });
    });
  });
});
