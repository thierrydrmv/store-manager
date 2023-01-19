const sales = [
  {
    "saleId": 1,
    "date": "2023-01-19T02:00:51.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-01-19T02:00:51.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-01-19T02:00:51.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const getSalesWithId = [
  {
    "date": "2023-01-19T02:00:51.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-01-19T02:00:51.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const addSalesObj = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

module.exports = { sales, getSalesWithId, addSalesObj }