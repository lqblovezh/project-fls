import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('xswitch',() => {
    it('startStorage',async () => {
        await service.xswitch.startStorage({
            path : 'dasd'
        })
    })
})
