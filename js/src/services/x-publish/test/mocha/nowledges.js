import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('nowledges',() => {
    it('modifyNowledges',async () => {
        await service.nowledges.modifyNowledges({
            id : '25135',
            name : '测试'
        })
    })

    it('deleteNowledges',async () => {
        await service.nowledges.deleteNowledges({
            id : ['123151']
        })
    })

    it('addNowledges',async () => {
        await service.nowledges.addNowledges({
            name : '知识点',
            t_id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            group_id : '81fb9f8d-d289-4d00-8d3b-f644778ece8d'
        })
    })

    it('upNowledges',async () => {
        await service.nowledges.upNowledges({
            id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0'
        })
    })

    it('modifyGroup',async () => {
        await service.nowledges.modifyGroup({
            id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.nowledges.listGroup();
    })

    it('deleteGroup',async () => {
        await service.nowledges.deleteGroup({
            id : ['534bdcae-c7cc-4313-a5df-f8b27d9b17e0']
        })
    })

    it('addGroup',async () => {
        await service.nowledges.addGroup({
            name : 'yh'
        })
    } )

    it('listNowledges',async () => {
        await service.nowledges.listNowledges({
            id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0'
        })
    })

    it('audioNowledges',async () => {
        await service.nowledges.audioNowledges({
            id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0'
        })
    })

    it('searchNowledges',async () => {
        await service.nowledges.searchNowledges({
            id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            name : 'yh'
        })
    })

    it('videoNowledges',async () => {
        await service.nowledges.videoNowledges({
            id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            name : 'yh'
        })
    })

    it('listKnowledge',async () => {
        await service.nowledges.listKnowledge({
            id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            group_id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0'
        })
    })

    it('addAnchor',async () => {
        await service.nowledges.addAnchor({
            _id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            c_id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            b_id : '534bdcae-c7cc-4313-a5df-f8b27d9b17e0',
            name : 'yh'
        })
    })
})
