import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('mult_book',() => {
    it('startStorage', async () => {
        await service.mult_book.startStorage({
            id : '132454',
            type : 'epub'
        })
    })
})