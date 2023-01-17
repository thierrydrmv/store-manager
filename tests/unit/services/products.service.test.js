const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services')
const { product, products } = require('./mocks/products.mock')
const { productsModel } = require('../../../src/models')

describe('teste do service de produtos', function () {
  it('recuperando todos os produtos', async function () {
    // Arrange
    sinon.stub(productsModel, 'findAll').resolves(products);
    // Act
    const result = await productsService.findAll();
    // Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products);
  });

  it('recuperando um produto com sucesso', async function () {
    // Arrange
    sinon.stub(productsModel, 'findById').resolves(product);
    // Act
    const result = await productsService.findById(1);
    // Assert
    expect(result.message).to.be.deep.equal({
      "id": 1,
      "name": "Martelo de Thor"
    })
  });

  it('erro ao recuperar um produto', async function () {
    const result = await productsService.findById('a');
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"value" must be a number')
  });

  it('produto não encontrado', async function () {
    // Arrange
    sinon.stub(productsModel, 'findById').resolves(undefined);
    // Act
    const result = await productsService.findById(1);
    // Assert
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found')
  });

  it('adicionando um novo produto com sucesso', async function () {
    // Arrange
    sinon.stub(productsModel, 'createProduct').resolves(product);
    // Act
    const result = await productsService.createProduct('camiseta azul');
    // Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(product)
  });

  it('falhando ao adicionar um produto novo', async function () {
    // Arrange
    sinon.stub(productsModel, 'createProduct').resolves(product);
    // Act
    const result = await productsService.createProduct(1);
    // Assert
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"value" must be a string')
  });

  afterEach(() => {
    sinon.restore();
  });
})