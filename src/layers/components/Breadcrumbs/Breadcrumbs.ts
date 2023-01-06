import { IBasketProduct, IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IBreadcrumbs } from './Breadcrumbs.types';
import './Breadcrumbs.scss';

class Breadcrumbs {
    private container: HTMLElement;
    private observer: Observer;
    private breadData: IModelData;
    private product: IBasketProduct;

    constructor({ container, observer, breadData, product }: IBreadcrumbs) {
        this.container = container;
        this.observer = observer;
        this.breadData = breadData;
        this.product = product;
    }

    public render() {
        const BreadcrumbsContent = document.createElement('ul');
        BreadcrumbsContent.classList.add('breadcrumbs');
        BreadcrumbsContent.innerHTML = `
        <li class="breadcrumbs__item"><a href="#" class="link">All bags and bagpacks</a></li>
        <li class="breadcrumbs__item"><a href="#" class="link">${this.product.category}</a></li>
        <li class="breadcrumbs__item"><a>${this.product.title}</a></li>`;

        this.container.insertAdjacentElement('beforebegin', BreadcrumbsContent);
    }
}

export { Breadcrumbs };
