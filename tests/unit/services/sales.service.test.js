const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { sale, sales, body, resposta } = require('./mocks/sales.mock');
const { salesModel } = require('../../../src/models');

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
    expect(result.message).to.equal('Sale not found' );
  })

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

  // it('editando uma venda', async function () {
  //   sinon.stub(salesModel, 'editSale').resolves(sale)
  //   const result = await salesService.editSale(body[0], 1)
  //   expect(result.type).to.equal(null);
  //   expect(result.message).to.equal(sale);
  // });

  afterEach(() => {
    sinon.restore()
  });
});