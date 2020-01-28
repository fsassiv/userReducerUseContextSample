import AppListItem from "./AppListItem.jsx";

describe("AppListItem", () => {
  const props = {
    item: { image: ["fist", "second"], url: "some http", name: "item name" },
    itemTheme: "dark"
  };

  const appListItem = shallow(<AppListItem {...props} />);

  it("rendered correctly", () => {
    expect(appListItem).toMatchSnapshot();
  });

  it("check if it has the right class", () => {
    expect(appListItem.find(".list__item").hasClass("dark")).toBeTruthy();
  });
});
