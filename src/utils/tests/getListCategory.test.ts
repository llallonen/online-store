import { IBasketProduct } from '../../layers/Model/Model.types';
import { IAllProducts } from '../../layers/components/FilterItem/FilterItem.types';
import { getListCategory } from '../getListCategory';

describe('getListCategory function', () => {
    const product: IBasketProduct[] = [
        {
            id: 5,
            title: 'Bag',
            description: 'Bag cool',
            price: 200,
            discountPercentage: 12,
            rating: 1,
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
            rating: 1,
            color: 'red',
            size: 'xxl',
            stock: 30,
            brand: 'BingoBongo2',
            category: 'Bags2',
            images: [
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
            ],
            count: 4,
        },

        {
            id: 5,
            title: 'Bag',
            description: 'Bag cool',
            price: 200,
            discountPercentage: 12,
            rating: 1,
            color: 'red',
            size: 'xxl',
            stock: 30,
            brand: 'BingoBongo2',
            category: 'Bags2',
            images: [
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
            ],
            count: 4,
        },
    ];

    const result: IAllProducts[] = [
        {
            count: 1,
            name: 'Bags',
        },
        {
            count: 2,
            name: 'Bags2',
        },
    ];

    const result2: IAllProducts[] = [
        {
            count: 1,
            name: 'Bags',
        },
        {
            count: 1,
            name: 'Bags2',
        },
    ];

    test('Should be equal result', () => {
        expect(getListCategory(product)).toEqual(result);
    });

    test('Should length be 2', () => {
        expect(getListCategory(product)).toHaveLength(2);
    });

    test('Should be equal result2', () => {
        expect(getListCategory([product[0], product[1]])).toEqual(result2);
    });
});
