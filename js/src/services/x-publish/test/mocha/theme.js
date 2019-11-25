/**
 * Created by Administrator on 2018/3/29.
 */
import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('theme',() => {
    it('addTheme',async () => {
        await service.theme.addTheme({
            name : "yh"
        })
    })
    it('modifyTheme',async () => {
        await service.theme.modifyTheme({
            id : "515115",
            name : "yh"
        })
    })
    it('ListTheme',async () => {
        await service.theme.ListTheme()
    })

    it('deleteTheme',async () => {
        await service.theme.deleteTheme({
            id : [1]
        })
    })

    it('modifyGroup',async () => {
        await service.theme.modifyGroup({
            id : 1,
            name : "yh"
        })
    })
    it('listGroup',async () => {
        await service.theme.listGroup()
    })

    it('deleteGroup',async () => {
        await service.theme.deleteGroup({
            id : ['11']
        })
    })

    it('addGroup',async () => {
        await service.theme.addGroup({
            name : "yh"
        })
    })

    it('moveGroup',async () => {
        await service.theme.moveGroup({
            new_group_id : "5151",
            old_group_id : "1231",
            id : ["12312"]
        })
    })

    it('deleteThemeBook',async () => {
        await service.theme.deleteThemeBook({
           data : [
               {
                   tid : '123',
                   id : '1230',
                   type : 'ss',
               }
           ]
        })
    })

    it('detailTheme',async () => {
        await service.theme.detailTheme({
            id : 'dd54515'
        })
    })

    it('_themeAdd',async () => {
        await service.theme._themeAdd({

        })
    })
})