import { useContext } from "react";
import { SearchContext } from "./SearchContext";

/** Shortcut: read `searchValue` / `setSearchValue` from `SearchProvider`. */
export const useSearch = () => useContext(SearchContext);
