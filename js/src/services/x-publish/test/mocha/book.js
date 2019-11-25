import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('books',() => {
    let data = {
        name : "name",
        id : "1"
    }
    let schema = Joi.object({
        name : Joi.string()
    })
    it('modifyBooks',async () => {
        await service.books.modifyBooks(data)
    })

    it('deleteBooks',async () => {
        await service.books.deleteBooks(data)
    })

    it('listBooks',async () => {
        await service.books.listBooks().then(res => {
            let output = Joi.validate(res.data[0],schema);
            console.log(output)
        })
    })
    it('detailBooks',async () => {
        await service.books.detailBooks(data)
    })
    it('addBooks',async () => {
        await service.books.addBooks(data)
    })
    it('getBookCatalog',async () => {
        await service.books.getBookCatalog({
            id : "56141531",
            name : "yh"
        })
    })

    it('modifyGroup',async () => {
        await service.books.modifyGroup({
            id : "132165415",
            name : '测试'
        })
    })

    it('listGroup',async () => {
        await service.books.listGroup()
    })

    it('deleteGroup',async () => {
        await service.books.deleteGroup({
            id : '132165415'
        })
    })

    it('addGroup',async () => {
        await service.books.addGroup({
            name : "测试1"
        })
    })

    it('moveGroup',async () => {
        await service.books.moveGroup({
            new_group_id : "12345641",
            id : ['1212']
        })
    })

    it('siblingSort',async () => {
        await service.books.siblingSort({
            id : '1212',
            sort : "up"
        })
    })

})