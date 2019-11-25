/**
 * Created by Administrator on 2018/3/15.
 */
import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('common',() => {
    let data = {
        id : '12354565'
    };
    const schema = Joi.object({
        token: Joi.string(),
        expire_time: Joi.string()
    })
    // it("getTask",async () => {
    //     await service.common.getTask(data)
    // })
    it("adminLogin", async () => {
        await service.common.adminLogin({
            user_name : "admin",
            user_pass : "123456",
            platform : "web"
        }).then(res => {
            let output = Joi.validate(res.data,schema);
            console.log(output);
        })
    })
});


describe('data',()=>{
    let data = {
        id : "asd1"
    }
    let addData = {
        simp : "ss",
        trad : ["1","2"]
    }
    const schema = Joi.object({
        id: Joi.string(),
        name: Joi.string(),
        nick : Joi.string(),
    })
    it('deleteFont',async () => {
        await service.data.deleteFont(data)
    })

    it('modifyFont',async () =>{
        await service.data.modifyFont({
            id : '1354151',
            simp : '你',
        })
    })

    it('addFont', async () => {
        await service.data.addFont(addData)
    })

    it('listFont',async () => {
        await service.data.listFont(addData);
    })

    it('detailFont',async () => {
        await service.data.detailFont(data);
    })

    it('deleteNickName',async () => {
        await service.data.deleteNickName(data)
    })

    it('listNickName',async () => {
        await service.data.listNickName(addData).then(res => {
            let output = Joi.validate(res.data[0],schema,{
                allowUnknown: true
            })
        })
    })
    it('detailNickName',async () => {
        await service.data.detailNickName(data)
    })
    it('addNickName',async () => {
        await service.data.addNickName(addData)
    })
    it('modifyNickName',async () => {
        await service.data.modifyNickName(data)
    })
})





