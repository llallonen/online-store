import { createElement } from '../../../utils/createElement';
import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { IAllProducts, IFilterItemProps } from './FilterItem.types';

class FilterItem {
    private container: HTMLElement;
    private observer: Observer;
    private product: IAllProducts;
    private filteredCount: number;
    private item: HTMLElement | undefined;
    private eventName: EventName;
    private filterArr: string[];
    constructor({ container, observer, product, filteredCount, eventName, filterArr }: IFilterItemProps) {
        this.container = container;
        this.observer = observer;
        this.product = product;
        this.filteredCount = filteredCount;
        this.eventName = eventName;
        this.filterArr = filterArr;
    }
    public render(): void {
        const layout = `
            <input class="filterList__input ${
                this.eventName === EventName.filterCategory ? 'brand' : 'category'
            }" type="checkbox" 
            ${this.filterArr.indexOf(this.product.name) !== -1 ? 'checked' : ''}
            id="${this.product.name}">
            <label for="${this.product.name}">${this.product.name}</label>
            <span>(${this.filteredCount}/${this.product.count})</span>`;

        const wrapper = createElement('div', `filterList__item`);
        if (this.filteredCount === 0) {
            wrapper.classList.add('disabled');
        }
        wrapper.innerHTML = layout;
        this.item = wrapper;
        this.container.append(wrapper);
    }
}

export { FilterItem };
