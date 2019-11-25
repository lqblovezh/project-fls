import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('content',() => {
    it('modifyContent',async () => {
        await service.content.modifyContent({
            id : "134214",
            name : "sadasd"
        })
    })
    it('listContent',async () => {
        await service.content.listContent()
    })
    it('deleteContent',async () => {
        await service.content.deleteContent({
            id : ['1512'],
        })
    })
    it('detailContent',async () => {
        await service.content.detailContent({
            id : '134214'
        })
    })
    it('addContent',async () => {
        await service.content.addContent({
            name : "sadasd"
        })
    })

    it('modifyGroup',async () => {
        await service.content.modifyGroup({
            id : "132165415",
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.content.listGroup()
    })

    it('deleteGroup',async () => {
        await service.content.deleteGroup({
            id : ['132165415']
        })
    })

    it('addGroup',async () => {
        await service.content.addGroup({
            name : "测试1"
        })
    })

    it('moveGroup',async () => {
        await service.content.moveGroup({
            new_group_id : "12345641",
            id : ['1212']
        })
    })
})
