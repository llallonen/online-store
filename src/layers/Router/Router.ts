import { IMain } from '../components/Main/Main.types';
import { Page404 } from '../pages/404/404';
import { BasketPage } from '../pages/basket/basket';
import { MainPage } from '../pages/main/main';
import { ProductPage } from '../pages/product/product';
import IRoutes, { ClassName } from './Router.types';

class Router {
    private path: string;
    private routes: IRoutes = [
        { path: '404', component: Page404 },
        { path: '#', component: MainPage },
        { path: '', component: MainPage },
        { path: '#basket', component: BasketPage },
        { path: '#product', component: ProductPage },
    ];
    constructor() {
        this.path = location.hash;
    }

    getPath(): string {
        return this.path;
    }

    setPath(): void {
        const hash = location.hash.match(/^[#]\w*/g);
        if (hash) {
            if (hash[0]) {
                this.path = hash[0];
            }
        } else {
            this.path = '';
        }
    }

    getPage({ container, observer, data }: IMain): ClassName {
        this.setPath();
        const className = this.routes.find((route) => route.path === this.path)?.component;
        return className
            ? new className({ container, observer, data })
            : new this.routes[0].component({ container, observer, data });
    }
}

export default Router;
