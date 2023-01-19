const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { sale, sales, body, resposta, failBody, productIdInvalid, objSale } = require('./mocks/sales.mock');
const { salesModel, productsModel } = require('../../../src/models');

chai.use(sinonChai);

describe('teste do service de vendas', function () {
  it('recuperando todas as vendas', async function () {
    // Arrange
    sinon.stub(salesModel, 'findAll').resolves(sales)
    // Act
    const result = await salesService.findAll();
    // Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(sales);
  });

  it('erro ao recuperar uma venda pelo id', async function () {
    // Arrange
    sinon.stub(salesModel, 'findById').resolves(sale);
    // Act
    const result = await salesService.findById(123);
    // Assert
    expect(result.type).to.equal('SALE_NOT_FOUND');
    expect(result.message).to.equal('Sale not found');
  });

  it('recuperando uma venda pelo id', async function () {
    // Arrange
    sinon.stub(salesModel, 'findById').resolves(objSale);
    // Act
    const result = await salesService.findById(1);
    // Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(objSale);
  });

  it('criar uma nova venda', async function () {
    // Arrange
    sinon.stub(salesModel, 'createSale').resolves(resposta);
    // Act
    const result = await salesService.createSale(body);
    // Assert
    expect(result.type).to.equal(null);
  });

  it('deletar uma venda', async function () {
    // Arrage
    sinon.stub(salesModel, 'deleteSale').resolves();
    // Act
    const result = await salesService.deleteSale(1);
    // Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(undefined);
  });

  it('editando uma venda com objeto inválido', async function () {
    sinon.stub(salesModel, 'editSale').resolves()
    const result = await salesService.editSale(failBody, 1)
    expect(result.type).to.equal('INVALID_OBJECT');
    expect(result.message).to.equal('"quantity" is required');
  });

  it('editando uma venda com productId inválido', async function () {
    sinon.stub(salesModel, 'editSale').resolves()
    const result = await salesService.editSale(productIdInvalid, 1)
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  afterEach(() => {
    sinon.restore()
  });
});