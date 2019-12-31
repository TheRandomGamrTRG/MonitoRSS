const Blacklist = require('../../../structs/db/Blacklist.js')

describe('Unit::structs/db/Blacklist', function () {
  describe('constructor', function () {
    it('throws for undefined id', function () {
      const data = {
        type: 123,
        name: 'gfh'
      }
      expect(() => new Blacklist(data))
        .toThrow(new TypeError('id is undefined'))
    })
    it('throws for undefined type', function () {
      const data = {
        id: 'asd',
        name: 'gfh'
      }
      expect(() => new Blacklist(data))
        .toThrow(new TypeError('type is undefined'))
    })
    it('throws for NaN type', function () {
      const data = {
        id: 'asd',
        name: 'gfh',
        type: 'he'
      }
      expect(() => new Blacklist(data))
        .toThrow(new TypeError('type is not a number'))
    })
    it('does not throw for missing name', function () {
      const data = {
        id: 'asd',
        type: 2
      }
      expect(() => new Blacklist(data))
        .not.toThrow()
    })
  })
  describe('toObject', function () {
    it('returns correctly', function () {
      const data = {
        id: 'srfh',
        name: '3e45y',
        type: 5
      }
      const blacklist = new Blacklist({ ...data })
      const returned = blacklist.toObject()
      expect(returned).toEqual(data)
    })
  })
  describe('static get TYPES', function () {
    it('returns correctly', function () {
      expect(Blacklist.TYPES.GUILD).toEqual(1)
      expect(Blacklist.TYPES.USER).toEqual(0)
    })
  })
})
