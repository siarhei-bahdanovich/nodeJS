class Product {
  static findById(id) {
    return new Promise((resolve, reject) => {
      let product = products.filter((product) => product.id === id)[0];
      product ? resolve(product) : reject();
    });
  }
}

const products =
  [
    {
      id: '1',
      name: 'product 1 name',
      reviews: [
        {
          author: 'author 1',
          text: 'review text 1'
        }
      ]
    },
    {
      id: '2',
      name: 'product 2 name',
      reviews: [
        {
          author: 'author 1',
          text: 'review text 1'
        },
        {
          author: 'author 2',
          text: 'review text 2'
        }
      ]
    }
  ];

export { Product, products };