/**
 * Created by Administrator on 2018/4/4.
 */
import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('dispense',() => {
    it('getMetadatas',async () => {
        await service.dispense.getMetadatas({
            id : 'dsaa51'
        })
    })

    it('getDetail',async () => {
        await service.dispense.getDetail({
            id : 'dsaa51'
        })
    })

    it('getList',async () => {
        await service.dispense.getList()
    })

    it('getDispense',async () => {
        await service.dispense.getDispense()
    })

    it('getOverview',async () => {
        await service.dispense.getOverview()
    })
})