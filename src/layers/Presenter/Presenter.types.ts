import { IBasket } from '../Model/Model.types';

interface IPresenterProps {
    container: HTMLElement;
}

interface ILocalStorage {
    basketData: IBasket;
}

type ILocalStorageData = ILocalStorage | null | undefined;

export { IPresenterProps, ILocalStorage, ILocalStorageData };
