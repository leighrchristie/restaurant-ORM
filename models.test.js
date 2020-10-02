const db = require('./db')
const {Restaurant, Menu, Item} = require('./models')

describe('restaurant', function () {
    beforeAll(function(done) {
        db.exec('CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT, city TEXT);', done)
    })
    test('adding to the database', async () => {
        const restaurant = await new Restaurant({name:'Flour & Grape', image:'image.jpeg', city: 'London'})
        expect(restaurant.id).toBe(1)
    })

    test('create a restaurant for the data row', async (done) => {
        db.get('SELECT * from restaurants WHERE id=1;', async (err, row) => {
            expect(row.name).toBe('Flour & Grape')
            const restaurant = await new Restaurant(row)
            expect(restaurant.id).toBe(1)
            expect(restaurant.name).toBe('Flour & Grape')
            expect(restaurant.city).toBe('London')
            done()
        })
    })
})

describe('menu', function () {
    beforeAll(function(done) {
        db.exec('CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER);', done)
    })
    test('adding to the database', async () => {
        const menu = await new Menu({title: 'Afternoon Tea'})
        expect(menu.id).toBe(1)
    })
    
    
    test('create a menu for the data row', async (done) => {
        db.get('SELECT * from menus WHERE id=1;', async (err, row) => {
            expect(row.title).toBe('Afternoon Tea')
            const menu = await new Menu(row)
            expect(menu.id).toBe(1)
            expect(menu.title).toBe('Afternoon Tea')
            done()
        })
    })
}) 

describe('item', function () {
    beforeAll(function(done) {
        db.exec('CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, menu_id INTEGER);', done)
    })
    test('adding to the database', async () => {
        const item = await new Item({name: 'Scones with Jam & Cream'})
        expect(item.id).toBe(1)
    })

    test('create an item for the data row', async (done) => {
        db.get('SELECT * from items WHERE id=1;', async (err, row) => {
            expect(row.name).toBe('Scones with Jam & Cream')
            const item = await new Item(row)
            expect(item.id).toBe(1)
            expect(item.name).toBe('Scones with Jam & Cream')
            done()
        })
    })
}) 