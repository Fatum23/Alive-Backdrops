import { TypeNavbar } from "@shared/types";
import { Tab } from "./Tab";
import { Search } from "./Search";
import { NavigateButtons } from "./NavigateButtons";

export const HomePageNavbar = (props: TypeNavbar) => {
  return (
    <>
      <div className="mx-2 h-8 mt-2 flex flex-row gap-2 items-center">
        <Tab
          title="My library"
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <Tab
          title="Online library"
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <Search search={props.search} setSearch={props.setSearch} />
        <NavigateButtons />
      </div>
      <hr />
    </>
  );
};
