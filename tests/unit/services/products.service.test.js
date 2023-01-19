const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services')
const { product, products, productEdited } = require('./mocks/products.mock')
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
    const result = await productsService.createProduct('abc');
    // Assert
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('recuperando um produto pelo nome', async function () {
    sinon.stub(productsModel, 'findByName').resolves(product);
    const result = await productsService.findByName('Martelo');
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(product);
  });

  it('excluindo um produto pelo id', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves();
    const result = await productsService.deleteProduct(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(undefined);
  });

  it('editando um produto', async function () {
    sinon.stub(productsModel, 'editProduct').resolves(product);
    const result = await productsService.editProduct('aaa');
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  })

  it('erro ao editar um produto', async function () {
    sinon.stub(productsModel, 'editProduct').resolves(productEdited);
    const result = await productsService.editProduct(1, 'Martelo do chapolin');
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(productEdited);
  })

  afterEach(() => {
    sinon.restore();
  });
})