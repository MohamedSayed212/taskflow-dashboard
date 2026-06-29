/**
 * SearchProvider — stores the text in the sidebar search field so the Tasks page
 * (and anything else) can filter without prop drilling.
 */
import { useState } from "react";
import { SearchContext } from "./SearchContext";

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
