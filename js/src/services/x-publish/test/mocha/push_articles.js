import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('push_articles',() => {
    it('listArticles',async () => {
        await service.push_articles.listArticles()
    })
    it('detailArticles',async () => {
        await service.push_articles.detailArticles({
            id : "515115",
        })
    })
    it('deleteArticles',async () => {
        await service.push_articles.deleteArticles({
            id : ['134214'],
        })
    })

    it('modifyArticles',async () => {
        await service.push_articles.modifyArticles({
            id : '134214',
            name : 'yh'
        })
    })
    it('addArticles',async () => {
        await service.push_articles.addArticles({
            name : 'yh'
        })
    })

    it('urgent',async () => {
        await service.push_articles.urgent({
            id : ['134214'],
        })
    })

    it('distribute',async () => {
        await service.push_articles.distribute({
            id : '134214',
            status : "4"
        })
    })

    it('listGroup',async () => {
        await service.push_articles.listGroup()
    })

    it('addGroup',async () => {
        await service.push_articles.addGroup({
            name : 'ss'
        })
    })

    it('getMetadata',async () => {
        await service.push_articles.getMetadata({
            id : 151351
        })
    })
    it('modifyGroup',async () => {
        await service.push_articles.modifyGroup({
            id : 151351,
            name : 'yh'
        })
    })
    it('deleteGroup',async () => {
        await service.push_articles.deleteGroup({
            id : 151351
        })
    })
    it('moveGroup',async () => {
        await service.push_articles.moveGroup({
            id : ['151351'],
            new_group_id : '1121',
            old_group_id : '112100'
        })
    })

})