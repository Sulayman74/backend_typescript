import { Sum } from './../src/sum';
describe('Addition', function () {
    it("should add number a b", function () {
        expect(Sum.addition(5, 5)).toEqual(10)
    })
})