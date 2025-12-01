import { createContext } from "react";
import { UiStore } from "./uiStore";

interface IStore {
    uiStore: UiStore;
}

export const store: IStore = {
    uiStore: new UiStore()
}

export const StoreContext = createContext(store);