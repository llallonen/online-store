import { Page404 } from '../pages/404/404';
import { BasketPage } from '../pages/basket/basket';
import { MainPage } from '../pages/main/main';
import { ProductPage } from '../pages/product/product';

type IRoutes = IRoute[];

type IRoute = {
    path: string;
    class: classNames;
};

type classNames = typeof Page404 | typeof MainPage | typeof BasketPage | typeof ProductPage;
export type className = Page404 | MainPage | BasketPage | ProductPage;

export default IRoutes;
