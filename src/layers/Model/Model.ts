import { ProductListType } from '../components/ProductList/ProductList.types';
import { SortType } from '../components/SotrPanel/SortPanel.styles';
import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { IAction, IActionType, IModelData, IModelProps, IGoods, IFilter, ISort } from './Model.types';

class Model {
    private observer: Observer;
    private data: IModelData = {
        basket: {
            limit: 3,
            page: 1,
            products: [],
            promo: [],
        },
        goods: {
            products: [],
        },
        filter: {
            brand: [],
            category: [],
            price: [],
            stock: [],
        },
        sort: {
            type: ProductListType.small,
            sort: SortType.priceASC,
        },
    };

    constructor({ observer }: IModelProps) {
        this.observer = observer;
        this.setQueryParams();
    }

    public updateState({ type, payload }: IAction) {
        switch (type) {
            case IActionType.basket:
                this.data.basket = { ...this.data.basket, ...payload };
                localStorage.setItem('online-store2023', JSON.stringify({ basketData: { ...this.data.basket } }));
                break;
            case IActionType.goods:
                this.data.goods = payload as IGoods;
                break;
            case IActionType.filter:
                this.data.filter = payload as IFilter;
                break;
            case IActionType.sort:
                this.data.sort = payload as ISort;
                break;
            default:
                break;
        }
        this.notify();
    }

    private notify() {
        this.observer.notify({ eventName: EventName.updateState, eventPayload: this.data });
    }

    public getState(): IModelData {
        return { ...this.data };
    }

    public setQueryParams() {
        const hash = location.hash;
        const query = hash.match(/\?[a-zA-Z=&0-9]{0,}/g);
        if (query && query[0]) {
            const urlParams = new URLSearchParams(query[0]);
            const params = Object.fromEntries(urlParams.entries());
            console.log(query, params); //http://localhost:8080/#basket?ss=2&dd=3  {ss: '2', dd: '3'}
            const queryArray = Object.entries(params);
            console.log('zzzz', queryArray);
            queryArray.forEach((query) => {
                if (query[0] === 'limit' && /\d*/g.test(query[1])) {
                    this.data.basket.limit = Number(query[1]);
                }
                if (query[0] === 'page' && /\d*/g.test(query[1])) {
                    this.data.basket.page = Number(query[1]);
                }
            });
            this.notify();
        }
    }
}

export { Model };
