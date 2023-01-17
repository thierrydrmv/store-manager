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
  afterEach(() => 
  sinon.restore())
})