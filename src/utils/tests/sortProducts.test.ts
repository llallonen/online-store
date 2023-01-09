import { SortType } from '../../layers/components/SortPanel/SortPanel.types';
import { IBasketProduct } from '../../layers/Model/Model.types';
import { sortProducts } from '../sortProducts';

describe('sortProducts function', () => {
    const product: IBasketProduct[] = [
        {
            id: 5,
            title: 'Bag',
            description: 'Bag cool',
            price: 100,
            discountPercentage: 12,
            rating: 3,
            color: 'red',
            size: 'xxl',
            stock: 30,
            brand: 'BingoBongo',
            category: 'Bags',
            images: [
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
            ],
            count: 2,
        },
        {
            id: 5,
            title: 'Bag',
            description: 'Bag cool',
            price: 200,
            discountPercentage: 12,
            rating: 2,
            color: 'red',
            size: 'xxl',
            stock: 30,
            brand: 'BingoBongo',
            category: 'Bags',
            images: [
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
            ],
            count: 4,
        },
    ];
    test('Should return array with one element', () => {
        expect(sortProducts([product[0]], SortType.priceASC)).toEqual([product[0]]);
    });
    test('Should return correct sorted array', () => {
        expect(sortProducts(product, SortType.ratingASC)).toEqual([product[0], product[1]]);
    });
});
