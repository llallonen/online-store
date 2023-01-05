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
            type: ProductListType.big,
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
            default:
                break;
        }
        this.notify();
    }

    public updateFilter(payload: IFilter) {
        this.data.filter = payload;
    }
    public updateSort(payload: ISort) {
        this.data.sort = payload;
    }
    public updateGoods(payload: IGoods) {
        this.data.goods = payload;
    }

    private notify() {
        this.observer.notify({ eventName: EventName.updateState, eventPayload: this.data });
    }

    public getState(): IModelData {
        return { ...this.data };
    }

    public setQueryParams() {
        const hash = location.hash;
        const query = hash.match(/\?[a-zA-Z=&0-9,]{0,}/g);
        if (query && query[0]) {
            const urlParams = new URLSearchParams(query[0]);
            const params = Object.fromEntries(urlParams.entries());
            const queryArray = Object.entries(params);
            queryArray.forEach((query) => {
                if (query[0] === 'limit' && /\d*/g.test(query[1])) {
                    this.data.basket.limit = Number(query[1]);
                }
                if (query[0] === 'page' && /\d*/g.test(query[1])) {
                    this.data.basket.page = Number(query[1]);
                }
                if (query[0] === 'type' && query[1] === ProductListType.small) {
                    this.data.sort.type = ProductListType.small;
                }
                if (
                    query[0] === 'sort' &&
                    (query[1] === SortType.priceDESC ||
                        query[1] === SortType.priceASC ||
                        query[1] === SortType.ratingASC ||
                        query[1] === SortType.ratingDESC)
                ) {
                    this.data.sort.sort = query[1];
                }
                if (query[0] === 'category' && query[1].length !== 0) {
                    const categories = query[1].split(',');
                    this.data.filter.category = [];
                    categories.forEach((category) => {
                        this.data.filter.category.push(category);
                    });
                }
                if (query[0] === 'brand' && query[1].length !== 0) {
                    const brands = query[1].split(',');
                    this.data.filter.brand = [];
                    brands.forEach((brand) => {
                        this.data.filter.brand.push(brand);
                    });
                }
                if (query[0] === 'price' && query[1].length !== 0 && /\d*/g.test(query[1])) {
                    const priceArr = query[1].split(',');
                    if (!Number.isNaN(Number(priceArr[0])) && !Number.isNaN(Number(priceArr[1]))) {
                        this.data.filter.price = [Number(priceArr[0]), Number(priceArr[1])];
                    }
                }
                if (query[0] === 'stock' && query[1].length !== 0 && /\d*/g.test(query[1])) {
                    const stockArr = query[1].split(',');
                    if (!Number.isNaN(Number(stockArr[0])) && !Number.isNaN(Number(stockArr[1]))) {
                        this.data.filter.stock = [Number(stockArr[0]), Number(stockArr[1])];
                    }
                }
            });
            this.notify();
        }
    }
}

export { Model };
