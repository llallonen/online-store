import { IBasketProduct } from '../../layers/Model/Model.types';
import { countTotalPriceWithPromo } from '../countTotalPriceWithPromo';

describe('countTotalPriceWithPromo function', () => {
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

    const dis1 = ['RS', 'EPM'];
    const dis2 = ['RS'];

    test('Should return correct value 1600 - 20%', () => {
        expect(countTotalPriceWithPromo(product, dis1)).toBe(1600);
    });

    test('Should return correct value 1600 - 10%', () => {
        expect(countTotalPriceWithPromo(product, dis2)).toBe(1800);
    });

    test('Should return correct value 2000 - 0%', () => {
        expect(countTotalPriceWithPromo(product, [])).toBe(2000);
    });
});
