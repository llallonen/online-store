import { IMain } from '../components/Main/Main.types';
import { Page404 } from '../pages/404/404';
import { BasketPage } from '../pages/basket/basket';
import { MainPage } from '../pages/main/main';
import { ProductPage } from '../pages/product/product';
import IRoutes from './Router.types';

class Router {
    private path: string;
    private routes: IRoutes = [
        { path: '404', class: Page404 },
        { path: '#', class: MainPage },
        { path: '#basket', class: BasketPage },
        { path: '#product', class: ProductPage },
    ];
    constructor() {
        this.path = location.hash;
    }

    getPath() {
        return this.path;
    }

    setPath() {
        const hash = location.hash.match(/^[#]\w*/g);
        if (hash) {
            if (hash[0]) {
                this.path = hash[0];
            }
        } else {
            this.path = '';
        }

        console.log('hash', this.path);
    }

    getPage({ container, observer, data }: IMain) {
        this.setPath();
        const className = this.routes.find((route) => route.path === this.path)?.class;
        console.log(className);
        return className
            ? new className({ container, observer, data })
            : new this.routes[0].class({ container, observer, data });
    }
}

export default Router;
