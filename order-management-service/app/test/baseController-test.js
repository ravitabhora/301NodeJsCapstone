const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const db = require('../models/index');
const baseController = require('../controllers/baseController');
const app = require('../index');

const FakeId = faker.datatype.uuid();
// sinon.replace(db.Order, "findByPk", sinon.fake.returns(Promise.resolve(
//   {
//         id: FakeId,
//         restId: "f209cd51-5582-4025-85f2-ad9b4b2483e4",
//         custId: "718293df-4c3c-4810-bfea-4b7cf4f0d4fc",
//         paybleAmount: "101",
//         address: "{\"city\":\"Reading\",\"state\":\"South Dakota\"}",
//         paymentMethod: "invoice",
//         status: true,
//         createdAt: "2021-08-16T10:11:03.000Z",
//         updatedAt: "2021-08-16T10:11:03.000Z"
//   }
// )));
describe("baseController", function () {
  
  const stubValue = {
    id: FakeId,
    restId: faker.datatype.uuid(),
    custId: faker.datatype.uuid(),
    paymentMethod: faker.finance.transactionType(),
    paybleAmount: faker.finance.amount(),
    address: {
      city: faker.address.city(),
      state: faker.address.state()
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
  };

  describe("getById", function () {
    it("should retrieve a model with specific id", async function () {
      const req = { params: { id: FakeId }, app };
      const stub = sinon.stub(db.Order, "findByPk").returns(Promise.resolve(stubValue));
      const order = await baseController.getById(req, "Order");
      // expect(stub.calledOnce).to.be.true;
      expect(order.id).to.equal(stubValue.id);
      expect(order.restId).to.equal(stubValue.restId);
      expect(order.custId).to.equal(stubValue.custId);
      expect(order.paymentMethod).to.equal(stubValue.paymentMethod);
      expect(order.paybleAmount).to.equal(stubValue.paybleAmount);
      expect(order.address).to.equal(stubValue.address);
      expect(order.createdAt).to.equal(stubValue.createdAt);
      expect(order.updatedAt).to.equal(stubValue.updatedAt);
    });
  });

  //   DESCRIBE("create",)
})