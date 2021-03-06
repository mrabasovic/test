import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Nike majica na kratke rukave',
      category: 'Majice',
      image: '/images/p1.jpg',
      price: 40,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'Siva majica dobrog kvaliteta',
    },
    {
      name: 'Adidas majica na kratke rukave',
      category: 'Majice',
      image: '/images/p2.jpg',
      price: 40,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'pamucna bela majica',
    },
    {
      name: 'Jordan majica na kratke rukave',
      category: 'Majice',
      image: '/images/p3.jpg',
      price: 55,
      countInStock: 0,
      brand: 'Jordan',
      rating: 4.8,
      numReviews: 17,
      description: 'crna majica na kratke rukave',
    },
    {
      name: 'Adidas trenerka',
      category: 'Pantalone',
      image: '/images/p4.jpg',
      price: 70,
      countInStock: 15,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 14,
      description: 'siva trenerka',
    },
    {
      name: 'Hydrogen trenerka',
      category: 'Pantalone',
      image: '/images/p5.jpg',
      price: 45,
      countInStock: 5,
      brand: 'Hydrogen',
      rating: 4.5,
      numReviews: 10,
      description: 'kvalitetan materijal',
    },
    {
      name: 'Asos trenerka',
      category: 'Pantalone',
      image: '/images/p6.jpg',
      price: 40,
      countInStock: 12,
      brand: 'Asos',
      rating: 4.5,
      numReviews: 15,
      description: 'zelena trenerka',
    },
  ],
};
export default data;
