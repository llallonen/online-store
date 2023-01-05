import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IBreadcrumbs } from './Breadcrumbs.types';
import './Breadcrumbs.scss';

class Breadcrumbs {
    private container: HTMLElement;
    private observer: Observer;
    private breadData: IModelData;

    constructor({ container, observer, breadData }: IBreadcrumbs) {
        this.container = container;
        this.observer = observer;
        this.breadData = breadData;
    }

    public render() {
        const BreadcrumbsContent = document.createElement('ul');
        BreadcrumbsContent.classList.add('breadcrumbs');
        BreadcrumbsContent.innerHTML = `
        <li class="breadcrumbs__item"><a href="#" class="link">All bags and bagpacks</a></li>
        <li class="breadcrumbs__item"><a href="#" class="link">${this.breadData.currProduct.category}</a></li>
        <li class="breadcrumbs__item"><a>${this.breadData.currProduct.title}</a></li>`;

        this.container.insertAdjacentElement('beforebegin', BreadcrumbsContent);
    }
}

export { Breadcrumbs };
