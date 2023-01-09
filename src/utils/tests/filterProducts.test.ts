import { IBasketProduct, IFilter } from '../../layers/Model/Model.types';
import { filterProducts } from '../filterProducts';

describe('filterProducts function', () => {
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

    const filter: IFilter = {
        brand: ['BingoBongo2'],
        category: ['Bags2'],
        price: [0, 300],
        stock: [0, 40],
    };

    const result = [
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

    test('Should be equal result', () => {
        expect(filterProducts(filter, product)).toEqual(result);
    });

    test('Should be equal [] if filter get 0 products', () => {
        expect(filterProducts(filter, [product[0]])).toEqual([]);
    });
});
