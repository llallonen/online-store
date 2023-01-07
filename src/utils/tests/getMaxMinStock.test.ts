import { IBasketProduct } from '../../layers/Model/Model.types';
import { getMaxMinStock, IMaxMin } from '../getMaxMinStock';

describe('getMaxMinStock function', () => {
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
            stock: 15,
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
            price: 50,
            discountPercentage: 12,
            rating: 1,
            color: 'red',
            size: 'xxl',
            stock: 2,
            brand: 'BingoBongo2',
            category: 'Bags',
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
            price: 100,
            discountPercentage: 12,
            rating: 1,
            color: 'red',
            size: 'xxl',
            stock: 30,
            brand: 'BingoBongo2',
            category: 'Bags',
            images: [
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
                'https://raw.githubusercontent.com/llallonen/online-store-src/main/13/01.jpeg',
            ],
            count: 4,
        },
    ];

    const result: IMaxMin = {
        max: 30,
        min: 2,
    };

    const result2: IMaxMin = {
        max: 15,
        min: 2,
    };

    test('Should be equal result', () => {
        expect(getMaxMinStock(product)).toEqual(result);
    });

    test('Should be equal result2', () => {
        expect(getMaxMinStock([product[0], product[1]])).toEqual(result2);
    });
});
