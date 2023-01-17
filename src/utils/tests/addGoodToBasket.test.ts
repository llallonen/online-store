import { IBasketProduct } from '../../layers/Model/Model.types';
import { addGoodToBasket } from '../changeGoodToBasket';

describe('getMaxMinStock function', () => {
    const product: IBasketProduct[] = [
        {
            id: 3,
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
            id: 4,
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

    const result: IBasketProduct[] = [
        {
            id: 3,
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
            count: 3,
        },
        {
            id: 4,
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
    const result2: IBasketProduct[] = [
        {
            id: 3,
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
            count: 3,
        },
        {
            id: 4,
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
            count: 5,
        },
    ];

    test('Should be equal result', () => {
        expect(addGoodToBasket(product, 3, { products: [product[2]] })).toEqual(result);
    });

    test('Should be equal result2', () => {
        expect(addGoodToBasket(product, 5, { products: [product[2]] })).toEqual(result2);
    });
});
