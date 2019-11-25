import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('libraries',() => {
    it('addLibraries',async () => {
        await service.libraries.addLibraries({
            name : "sadasd"
        })
    })
    it('modifyLibraries',async () => {
        await service.libraries.modifyLibraries({
            id : "515115",
            name : "sdas"
        })
    })
    it('listLibraries',async () => {
        await service.libraries.listLibraries()
    })
    it('deleteLibraries',async () => {
        await service.libraries.deleteLibraries({
            id : ['134214'],
        })
    })
    it('detailLibraries',async () => {
        await service.libraries.detailLibraries({
            id : "5315152"
        })
    })

    it('modifyGroup',async () => {
        await service.libraries.modifyGroup({
            id : "132165415",
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.libraries.listGroup()
    })

    it('deleteGroup',async () => {
        await service.libraries.deleteGroup({
            id : ['132165415']
        })
    })

    it('addGroup',async () => {
        await service.libraries.addGroup({
            name : "测试1"
        })
    })

    it('moveGroup',async () => {
        await service.libraries.moveGroup({
            new_group_id : "12345641",
            id : ['1212']
        })
    })
})
