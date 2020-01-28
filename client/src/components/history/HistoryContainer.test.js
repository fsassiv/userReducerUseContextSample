import HistoryContainer from "./HistoryContainer";
import { HistoryContext } from "./../../store/HistoryContext";

describe("HistoryContainer", () => {
  const mockClick = jest.fn();

  const contextValues = {
    historyState: { history: [], error: null },
    historyDispatch: { type: "action.type", payload: "action.payload" }
  };

  const historyContainer = mount(
    <HistoryContext.Provider value={contextValues}>
      <HistoryContainer />
    </HistoryContext.Provider>
  );

  it("rendered correctly", () => {
    expect(historyContainer).toMatchSnapshot();
  });

  it("check if the element [history__tab-btn] exists", () => {
    expect(historyContainer.find("#tab-one-btn").exists()).toBe(true);
  });

  describe("click on 'history__tab-btn' [artist]", () => {
    beforeEach(() => {
      historyContainer.find("#tab-one-btn").simulate("click");
    });

    it("check click event", () => {
      expect(mockClick).toHaveBeenCalled();
    });
  });
});
