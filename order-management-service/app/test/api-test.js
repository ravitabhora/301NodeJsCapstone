const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
chai.use(chaiHttp);
chai.should();

describe(' Order api', () => {
    return true;
    /**
     * Test for get api
     */
    const orderId = "0f687433-e727-480d-81c2-0f9e27f7126c";
    const orderIdInvalid = "d239e068-501f-49f1-9362-d43b33a8";

    describe("get api/orders to fetch list of orders", () => {
        it("It should get all orders", (done) => {
            chai.request(server)
                .get('/api/orders')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.should.have.property('message');
                    res.body.should.have.property('data');
                    res.body.data.order.should.be.a('array');
                    res.body.data.order[0].should.have.property('id')
                    res.body.data.order[0].should.have.property('restId')
                    res.body.data.order[0].should.have.property('custId')
                    res.body.data.order[0].should.have.property('paybleAmount')
                    res.body.data.order[0].should.have.property('address')
                    res.body.data.order[0].should.have.property('createdAt')
                    res.body.data.order[0].should.have.property('updatedAt')
                    done();
                })
        })

        it("It should not get all orders", (done) => {
            chai.request(server)
                .get('/api/order')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })



    /**
    * Test for get by Id api
    */

    describe("get api/orders/:id ", () => {
        // valid response with valid id 
        it("It should get order by Id", (done) => {
            chai.request(server)
                .get('/api/orders/' + orderId)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.should.have.property('message');
                    res.body.should.have.property('data');
                    res.body.data.order.should.be.a('object');
                    res.body.data.order.should.have.property('id')
                    res.body.data.order.should.have.property('restId')
                    res.body.data.order.should.have.property('custId')
                    res.body.data.order.should.have.property('paybleAmount')
                    res.body.data.order.should.have.property('address')
                    res.body.data.order.should.have.property('createdAt')
                    res.body.data.order.should.have.property('updatedAt')
                    done();
                })
        })

        // 404 response with invalid id

        it("It should not get order by invalid Id", (done) => {
            chai.request(server)
                .get('/api/orders/' + orderIdInvalid)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.should.have.property('message');
                    done();
                })
        })
    })

    /**
     * Test for post orders
     */

    describe("post api/orders", () => {

        // valid response with valid id 
        it("It should save order details", (done) => {
            const stubValue = {
                restId: faker.datatype.uuid(),
                custId: faker.datatype.uuid(),
                paymentMethod: faker.finance.transactionType(),
                paybleAmount: faker.finance.amount(),
                menuData: [{
                    menuId: faker.datatype.uuid(),
                    quantity: Math.floor(Math.random() * 7)
                }],
                address: {
                    city: faker.address.city(),
                    state: faker.address.state()
                }
            };
            chai.request(server)
                .post('/api/orders')
                .send(stubValue)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.should.have.property('message');
                    done();
                })
        })

        // 400 response with invalid id
        it("It should not save order without restId", (done) => {
            const stubValue = {
                custId: faker.random.uuid(),
                paymentMethod: faker.finance.transactionType(),
                paybleAmount: faker.finance.amount(),
                menuData: [{
                    menuId: faker.random.uuid(),
                    quantity: Math.floor(Math.random() * 7)
                }],
                address: {
                    city: faker.address.city(),
                    state: faker.address.state()
                }
            };
            chai.request(server)
                .post('/api/orders/')
                .send(stubValue)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.should.have.property('message');
                    done();
                })
        })
    })

    /**
     * Test for put orders
     */

    describe("put api/orders", () => {
        // valid response with valid id 
        it("It should update order details", (done) => {

            const stubValue = {
                paymentMethod: faker.finance.transactionType(),
                paybleAmount: faker.finance.amount(),
                menuData: [{
                    menuId: faker.datatype.uuid(),
                    quantity: Math.floor(Math.random() * 7)
                }],
                address: {
                    city: faker.address.city(),
                    state: faker.address.state()
                }
            };
            chai.request(server)
                .put('/api/orders/' + orderId)
                .send(stubValue)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.should.have.property('message');
                    done();
                })
        })

        // 400 response with invalid id
        it("It should not save order with invalid orderId", (done) => {
            let orderId = "d239e068-501f-49f1-9362-d43b33a82383";
            const stubValue = {
                paymentMethod: faker.finance.transactionType(),
                paybleAmount: faker.finance.amount(),
                menuData: [{
                    menuId: faker.random.uuid(),
                    quantity: Math.floor(Math.random() * 7)
                }],
                address: {
                    city: faker.address.city(),
                    state: faker.address.state()
                }
            };
            chai.request(server)
                .put('/api/orders/' + orderIdInvalid)
                .send(stubValue)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('type');
                    res.body.should.have.property('message');
                    done();
                })
        })
    })

    /**
    * Test for delete by Id api
    */

   describe("delete api/orders/:id ", () => {

    // valid response with valid id 
    it("It should delete order by Id", (done) => {
        chai.request(server)
            .delete('/api/orders/' + orderId)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('type');
                res.body.should.have.property('message');
                done();
            })
    })

    // 404 response with invalid id

    it("It should not get order by invalid Id", (done) => {
        chai.request(server)
            .delete('/api/orders/' + orderIdInvalid)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('type');
                res.body.should.have.property('message');
                done();
            })
    })
})
})