import { SortType } from '../layers/components/SortPanel/SortPanel.types';
import { IFilter, ISort, ProductListType } from '../layers/Model/Model.types';

export const updateQuery = (filters: IFilter, sort: ISort): void => {
    let query = `?`;

    if (
        filters.brands.length === 0 &&
        filters.category.length === 0 &&
        filters.price.length === 0 &&
        filters.stock.length === 0 &&
        filters.search.length === 0 &&
        sort.sort === SortType.priceASC &&
        sort.type === ProductListType.big
    ) {
        window.location.hash = '/';
    }

    if (filters.brands.length !== 0) {
        query += `brands=${filters.brands.join(',')}&`;
    }
    if (filters.category.length !== 0) {
        query += `category=${filters.category.join(',')}&`;
    }
    if (filters.price.length !== 0) {
        query += `price=${filters.price.join(',')}&`;
    }
    if (filters.stock.length !== 0) {
        query += `stock=${filters.stock.join(',')}&`;
    }
    if (filters.search.length !== 0) {
        query += `search=${filters.search[0]}&`;
    }
    if (sort.sort && sort.sort !== SortType.priceASC) {
        query += `sort=${sort.sort}&`;
    }
    if (sort.type && sort.type !== ProductListType.big) {
        query += `type=${sort.type}&`;
    }
    window.location.hash = query.slice(0, -1);
};
