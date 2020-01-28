import AppButton from "./AppButton.jsx";

describe("AppButton", () => {
  const mockClick = jest.fn();
  const props = { btnLabel: "Click Me", btnHandleClick: mockClick };
  const appBtn = shallow(<AppButton {...props} />);

  it("rendered correctly", () => {
    expect(appBtn).toMatchSnapshot();
  });

  describe("when clicked, call the 'btnHandleClick' function", () => {
    beforeEach(() => {
      appBtn.find(".appBtn").simulate("click");
    });

    it("call the 'btnHandleClick' callback", () => {
      expect(mockClick).toHaveBeenCalled();
    });
  });
});
