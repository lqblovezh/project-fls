import 'isomorphic-fetch';
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('article',() => {
    it('addArticle',async () => {
        await service.article.addArticle({
            name : "yanghao"
        })
    })
    it('modifyArticle',async () => {
        await service.article.modifyArticle({
            id : "56161",
            name : "yanghao"
        })
    })
    it('listArticle',async () => {
        await service.article.listArticle()
    })
    it('deleteArticle',async () => {
        await service.article.deleteArticle({
            id : ['51551']
        })
    })
    it('detailArticle',async () => {
        await service.article.detailArticle({
            id : "515451"
        })
    })

    it('modifyGroup',async () => {
        await service.article.modifyGroup({
            id : "132165415",
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.article.listGroup()
    })

    it('deleteGroup',async () => {
        await service.article.deleteGroup({
            id : ['132165415']
        })
    })

    it('addGroup',async () => {
        await service.article.addGroup({
            name : "测试1"
        })
    })

    it('moveGroup',async () => {
        await service.article.moveGroup({
            new_group_id : "12345641",
            id : ['1212']
        })
    })
    it('pushArticle', async () => {
        await service.article.pushArticle({
            id: ['123456','456789']
        })
    })
})