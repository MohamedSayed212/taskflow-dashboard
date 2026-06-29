import { useContext } from "react";
import { AppDataContext } from "./AppDataContext";

/** Shortcut: read shared mock data from `AppDataProvider`. */
export const useAppData = () => {
  const appData = useContext(AppDataContext);

  if (!appData) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return appData;
};
