import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Tan',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Iphone13',
      slug: 'apple-iphone-13',
      category: 'iphone',
      image: '/images/p1.png',
      price: '23000000',
      stock: '10',
      brand: 'apple',
      rating: 4.5,
      numReviews: 10,
      description: 'iphone 13',
    },
    {
      name: 'Iphone11',
      slug: 'apple-iphone-11',
      category: 'iphone',
      image: '/images/p2.png',
      price: '12390000',
      stock: '0',
      brand: 'apple',
      rating: 3.5,
      numReviews: 10,
      description: 'iphone 11',
    },
    {
      name: 'Samsungs12',
      slug: 'samsung-galaxy-s21',
      category: 'samsung',
      image: '/images/p3.png',
      price: '16490000',
      stock: '10',
      brand: 'samsung',
      rating: 2.0,
      numReviews: 10,
      description: 'samsung s21',
    },
    {
      name: 'Samsungz',
      slug: 'samsung-z-fold3',
      category: 'samsung',
      image: '/images/p4.png',
      price: '30780000',
      stock: '10',
      brand: 'samsung',
      rating: 4.5,
      numReviews: 10,
      description: 'samsung s21',
    },
  ],
};
export default data;
