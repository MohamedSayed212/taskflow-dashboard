import { createContext } from "react";

/** Default used only before the provider mounts (rare in real apps). */
export const SearchContext = createContext({
  searchValue: "",
  setSearchValue: () => {},
});
