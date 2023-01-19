const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { sales, newSale, salesAnswer } = require('./mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

describe('testando o controller das vendas', function () {
  it('listando todos as vendas', async function () {
    // Arrange
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findAll').resolves({ type: null, message: sales})
    // Act
    await salesController.allSales(req, res)

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  it('listando uma venda pelo Id', async function () {
    // Arrange
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findById').resolves({ type: null, message: sales[0] });

    // Act
    await salesController.getSales(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales[0]);
  });

  it('adicionando uma venda', async function () {
    const req = { body: newSale };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'createSale').resolves({ type: null, message: salesAnswer })

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesAnswer);
  });

  it('editando uma venda', async function () {
    const req = { body: newSale, params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'editSale').resolves({ type: null, message: newSale })

    await salesController.editSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('erro ao deletar um produto inexistente', async function () {
    const req = { params: { id: 12 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSale').resolves({ type:'SALE_NOT_FOUND', message: 'Sale not found' });
    await salesController.deleteSeal(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWithExactly({ message: 'Sale not found' });
  });

  afterEach(() => {
      sinon.restore();
    })
});