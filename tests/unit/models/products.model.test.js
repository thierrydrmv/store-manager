const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { products } = require('./mocks/products.mock')

const connection = require('../../../src/models/connection');

describe('teste do model de produtos', function () {

  it('Recuperando lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(products)
  });

  it('Recuperando um produto da lista', async function () {
    sinon.stub(connection, 'execute').resolves([[products[2]]])
    const result = await productsModel.findById(3);
    expect(result).to.be.deep.equal(products[2])
  });
  
  it('adicionando um produto a lista', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    // Act
    const result = await productsModel.createProduct('bob the builder t-shirt');
    // Assert
    expect(result).to.equal(5)
  });

  it('Recuperando um produto da lista pelo nome', async function () {
    sinon.stub(connection, 'execute').resolves([products[0]])
    const result = await productsModel.findByName('Martelo');
    expect(result).to.be.deep.equal(products[0])
  })

  afterEach(() => 
  sinon.restore())
})
