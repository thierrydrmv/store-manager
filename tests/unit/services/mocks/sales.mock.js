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

const objSale = [
  {
    "date": "2023-01-19T12:41:42.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-01-19T12:41:42.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const sale = {
    "saleId": 1,
    "date": "2023-01-19T02:00:51.000Z",
    "productId": 1,
    "quantity": 5
}

const body = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const failBody = [{
    "productId": 1,
},]
  
const productIdInvalid = [
  {
    "productId": 21,
    "quantity": 1
  },
];

const resposta = {
  "id": 4,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
  
module.exports = { sale, sales, body, resposta, failBody, productIdInvalid, objSale }