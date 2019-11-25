import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('audio',() => {
    it('addAudio',async () => {
        await service.audio.addAudio({
            name : "sadasd"
        })
    })
    it('modifyAudio',async () => {
        await service.audio.modifyAudio({
            id : "515115",
            name : "sdas"
        })
    })
    it('listAudio',async () => {
        await service.audio.listAudio()
    })
    it('deleteAudio',async () => {
        await service.audio.deleteAudio({
            id : ['134214'],
        })
    })
    it('detailAudio',async () => {
        await service.audio.detailAudio({
            id : "5315152"
        })
    })


    it('modifyGroup',async () => {
        await service.audio.modifyGroup({
            id : "132165415",
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.audio.listGroup()
    })

    it('deleteGroup',async () => {
        await service.audio.deleteGroup({
            id : ['132165415']
        })
    })

    it('addGroup',async () => {
        await service.audio.addGroup({
            name : "测试1"
        })
    })

    it('moveGroup',async () => {
        await service.audio.moveGroup({
            new_group_id : "12345641",
            id : ['1212']
        })
    })
})
