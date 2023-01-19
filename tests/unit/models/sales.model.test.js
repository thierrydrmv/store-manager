const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { sales, getSalesWithId, addSalesObj } = require('./mocks/sales.mock');

const connection = require('../../../src/models/connection');

describe('teste model de vendas', function () {

  it('Recuperando lista de vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await salesModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma venda da lista pelo id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([getSalesWithId]);
    // Act
    const result = await salesModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(getSalesWithId)
  });

  it('Recuperando uma lista com apenas ProductId e quantity', async function () {
    sinon.stub(connection, 'execute').resolves([addSalesObj[0]]);
    const result = await salesModel.getSaleById(2);
    expect(result).to.be.deep.equal(addSalesObj[0]);
  });

  it('Editando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.editSale(addSalesObj[0], 1); 
    expect(result).to.equal(undefined);
  })

  it('removendo uma venda', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(2);
    expect(result).to.equal(undefined);
  });

  afterEach(() =>
    sinon.restore());
});