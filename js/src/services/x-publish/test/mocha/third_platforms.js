/**
 * Created by Administrator on 2018/4/2.
 */
import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('third_platforms',() => {
    it('authorize',async () => {
        await service.third_platforms.authorize({
            id : '125151'
        })
    })

    it('cancelAuthorize',async () => {
        await service.third_platforms.cancelAuthorize({
            id : '125151'
        })
    })

    it('warrantyList',async () => {
        await service.third_platforms.warrantyList()
    })
})