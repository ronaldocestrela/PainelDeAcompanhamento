import { makeAutoObservable } from "mobx";

export class UiStore {
    isLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }
    
    isBusy = () => {
        this.isLoaded = true;
    }

    isIdle = () => {
        this.isLoaded = false;
    }
}