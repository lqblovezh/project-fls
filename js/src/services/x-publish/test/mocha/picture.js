import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('picture',() => {
    it('addPicture',async () => {
        await service.picture.addPicture({
            name : "sadasd"
        })
    })
    it('modifyPicture',async () => {
        await service.picture.modifyPicture({
            id : "515115",
            name : "sdas"
        })
    })
    it('listPicture',async () => {
        await service.picture.listPicture()
    })
    it('deletePicture',async () => {
        await service.picture.deletePicture({
            id : ['134214'],
        })
    })
    it('detailPicture',async () => {
        await service.picture.detailPicture({
            id : "5315152"
        })
    })

    it('modifyGroup',async () => {
        await service.picture.modifyGroup({
            id : "132165415",
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.picture.listGroup()
    })

    it('deleteGroup',async () => {
        await service.picture.deleteGroup({
            id : ['132165415']
        })
    })

    it('addGroup',async () => {
        await service.picture.addGroup({
            name : "测试1"
        })
    })

    it('moveGroup',async () => {
        await service.picture.moveGroup({
            new_group_id : "12345641",
            id : ['1212']
        })
    })
})