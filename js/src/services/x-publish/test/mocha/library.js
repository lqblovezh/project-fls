import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('library',() => {
    it('addLibrary',async () => {
        await service.library.addLibrary({
            name : "sadasd"
        })
    })
    it('modifyLibrary',async () => {
        await service.library.modifyLibrary({
            id : "515115",
            name : "sdas"
        })
    })
    it('listLibrary',async () => {
        await service.library.listLibrary()
    })
    it('deleteLibrary',async () => {
        await service.library.deleteLibrary({
            id : ['134214'],
        })
    })
    it('detailLibrary',async () => {
        await service.library.detailLibrary({
            id : "5315152"
        })
    })

    it('modifyGroup',async () => {
        await service.library.modifyGroup({
            id : "132165415",
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.library.listGroup()
    })

    it('deleteGroup',async () => {
        await service.library.deleteGroup({
            id : ['132165415']
        })
    })

    it('addGroup',async () => {
        await service.library.addGroup({
            name : "测试1"
        })
    })

    it('moveGroup',async () => {
        await service.library.moveGroup({
            new_group_id : "12345641",
            id : ['1212']
        })
    })
})