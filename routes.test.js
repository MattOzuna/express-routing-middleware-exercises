process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDB");



beforeEach(() => {
    let item = {name: 'Coka-Cola',
                price: 2}
    items.push(item)})

afterEach(() => items.length = 0)

describe('GET /items', () => {
    test('get all items', async() => {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([{name: 'Coka-Cola', price: 2}])
    })
})

describe('POST /items', () => {
    test('post new item to fakeDB', async() => {
        const res = await request(app).post('/items').send({name: 'ice', price: 4})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({answer: {name: 'ice', price: 4}})
    })
})

describe('GET /items/Coka-Cola', () => {
    test('get Coka-Cola item by name', async() => {
        const res = await request(app).get('/items/Coka-Cola')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({name: 'Coka-Cola', price: 2})
    })
    test('Respond with 404 for invalid name', async() => {
        const res = await request(app).get('/items/ice')
        expect(res.statusCode).toBe(404)
    })
})

describe('PATCH /items/Coka-Cola', () => {
    test('change name of Coka-Cola to Soda', async() => {
        const res = await request(app).patch('/items/Coka-Cola').send({name: 'Soda'})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated: {name:'Soda', price: 2}})
    })
    test('change price to 4', async () => {
        const res = await request(app).patch('/items/Coka-Cola').send({price: 4})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated: {name: 'Coka-Cola', price: 4}})
    })
    test('Respond with 404 for invalid name', async() => {
        const res = await request(app).patch('/items/ice').send({name: 'ice', price: 4})
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /items/Coka-Cola', () => {
    test('delete Coka-Cola from fake DB', async()=> {
        const res = await request(app).delete('/items/Coka-Cola')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: 'Deleted'})
    })
    test('Respond with 404 for invalid name', async() => {
        const res = await request(app).delete('/items/Soda')
        expect(res.statusCode).toBe(404)
    })
})
