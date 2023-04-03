import { Sum } from './../src/sum';
import { UserController } from '../src/controllers/user';

describe('Addition', function () {
    it("should add number a b", function () {
        expect(Sum.addition(5, 5)).toEqual(10)
    })
})

describe('Get Users', function () {
    it('should return user', async function () {
        const user = new UserController()
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        //@ts-ignore
        await user.getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
});
describe('Get Users by ID', function () {
    it('should return user by his ID', async function () {
        const user = new UserController()
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        //@ts-ignore
        await user.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
});
