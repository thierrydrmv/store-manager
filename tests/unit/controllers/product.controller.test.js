const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsList, newProduct, name } = require('./mocks/products.mock')
const { productController } = require('../../../src/controllers');

describe('testando o controller dos produtos', function () {
  it('listando todos os produtos', async function () {
    // Arrange
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findAll').resolves({ type: null, message: productsList})
    // Act
    await productController.allProducts(req, res)

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsList);
  });

  it('listando um produto específico', async function () {
    // Arrange
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findById').resolves({ type: null, message: productsList[0] })
    
    // Act
    await productController.getProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsList[0]);
  });

  it('passando um id inválido', async function () {
    const req = { params: { id: 'axc' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findById').resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' })
    
    // Act
    await productController.getProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
  });

  it('adicionando um produto com sucesso', async function () {
    const req = { body: newProduct };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'createProduct').resolves({ type: null,  message: name })
    
    // Act
    await productController.createProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(201);
  });

  it('erro ao tentar adicionar um produto', async function () {
    const req = { body: {name: 123} };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'createProduct').resolves({ type: 'INVALID_VALUE',  message: '"name" length must be at least 5 characters long' })
    
    // Act
    await productController.createProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message:'"name" length must be at least 5 characters long' });

  });


  afterEach(() => {
    sinon.restore();
  })
});