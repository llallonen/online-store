import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { ISortPanelProps, SortType } from './SortPanel.styles';
import './SortPanel.scss';

class SortPanel {
    private container: HTMLElement;
    private observer: Observer;
    private countProduct: number;
    private sortType: SortType;
    constructor({ container, observer, countProduct, sortType }: ISortPanelProps) {
        this.container = container;
        this.observer = observer;
        this.countProduct = countProduct;
        this.sortType = sortType;
    }

    public render(): void {
        const sortPanel = document.createElement('div');
        sortPanel.classList.add('SortPanel', 'SortPanel--marg');

        const sortPanelContent = `
        <input class="SortPanel__search" /><button class="button button__search">OK</button>
        <div class="SortPanel__found">Found: ${this.countProduct}</div>
        <div class="SortPanel__bottom">
          <select class="SortPanel__select">
            <option ${this.sortType === SortType.priceASC ? 'selected' : ''} data-type="${
            SortType.priceASC
        }">Sort by price ASC</option>
            <option ${this.sortType === SortType.priceDESC ? 'selected' : ''} data-type="${
            SortType.priceDESC
        }">Sort by price DESC</option>
            <option ${this.sortType === SortType.ratingASC ? 'selected' : ''} data-type="${
            SortType.ratingASC
        }">Sort by rating ASC</option>
            <option ${this.sortType === SortType.ratingDESC ? 'selected' : ''} data-type="${
            SortType.ratingDESC
        }">Sort by rating DESC</option>
          </select>
          <div class="SortPanel__buttons">
          <button class="SortPanel__button button button--sort-panel button--line" data-type="small"></button>
          <button class="SortPanel__button button button--sort-panel button--square" data-type="big"></button>
          </div>
          </div>
        `;

        sortPanel.innerHTML = sortPanelContent;

        this.container.append(sortPanel);
        this.addListener();
    }

    private addListener(): void {
        const buttonLine = document.querySelector('.button--line');

        if (buttonLine) {
            buttonLine.addEventListener('click', (e) => {
                this.observer.notify({ eventName: EventName.changeViewList, eventPayload: e });
            });
        }

        const buttonSquare = document.querySelector('.button--square');

        if (buttonSquare) {
            buttonSquare.addEventListener('click', (e) => {
                this.observer.notify({ eventName: EventName.changeViewList, eventPayload: e });
            });
        }

        const select = document.querySelector('.SortPanel__select');

        if (select) {
            select.addEventListener('change', (e) => {
                this.observer.notify({ eventName: EventName.setSorting, eventPayload: e });
            });
        }

        const searchInput = document.querySelector('.button__search');

        if (searchInput) {
            searchInput.addEventListener('click', (e) => {
                const input: HTMLInputElement | null = document.querySelector('.SortPanel__search');

                if (input) {
                    const value = input.value;

                    if (value) {
                        this.observer.notify({ eventName: EventName.changeSearch, eventPayload: e });
                    }
                }
            });
        }
    }
}

export { SortPanel };
