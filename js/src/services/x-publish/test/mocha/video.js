import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('video',() => {
    // it('addVideo',async () => {
    //     await service.video.addVideo({
    //         name : "sadasd"
    //     })
    // })
    // it('modifyVideo',async () => {
    //     await service.video.modifyVideo({
    //         id : "515115",
    //         name : "sdas"
    //     })
    // })
    it('listVideo',async () => {
        await service.video.listVideo({
            name  :'测试',
            author : '测试'
        })
    })
    // it('deleteVideo',async () => {
    //     await service.video.deleteVideo({
    //         id : ['134214'],
    //     })
    // })
    // it('detailVideo',async () => {
    //     await service.video.detailVideo({
    //         id : "5315152"
    //     })
    // })
    //
    // it('modifyGroup',async () => {
    //     await service.video.modifyGroup({
    //         id : "132165415",
    //         name : '测试'
    //     })
    // })
    //
    // it('listGroup',async () => {
    //     await service.video.listGroup()
    // })
    //
    // it('deleteGroup',async () => {
    //     await service.video.deleteGroup({
    //         id : ['132165415']
    //     })
    // })
    //
    // it('addGroup',async () => {
    //     await service.video.addGroup({
    //         name : "测试1"
    //     })
    // })
    //
    // it('moveGroup',async () => {
    //     await service.video.moveGroup({
    //         new_group_id : "12345641",
    //         id : ['1212']
    //     })
    // })

})