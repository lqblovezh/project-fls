import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('manager', () => {
    // it('modifyRole', async () => {
    //     await service.manager.modifyRole({
    //         id : 'a59050de-1c35-11e8-ace1-10c37b907e5d',
    //         name : 'yh'
    //     })
    // })
    // it('listRole', async () => {
    //     await service.manager.listRole()
    // })
    //
    // it('listManager', async () => {
    //     await service.manager.listManager()
    // })
    it('detailRole', async () => {
        await service.manager.detailRole({
            id : "83213272-21ba-11e8-960d-10c37b907e5d"
        }).then(res => {
            console.log('ok',res);
        })
    })
    // it('detailManager', async () => {
    //     await service.manager.detailManager({
    //         id : 'bbbbe833-a4ba-424c-bac2-337d2438c34d'
    //     })
    // })
    //
    // it('allJurisdiction', async () => {
    //     await service.manager.allJurisdiction()
    // })
    //
    //
    //
    // it('addRole', async () => {
    //     await service.manager.addRole({
    //         name : '12132',
    //         exp : 'cs'
    //     })
    // })
    //
    // it('addManager', async () => {
    //     await service.manager.addManager({
    //         name : '12132',
    //         nick_name : 'yanghao',
    //         phone : '18523845367',
    //         email : '289436955@qq.com',
    //         roles : ['ea480f45-e77f-4794-8f0d-a8ffba10ff11']
    //     })
    // })
    // it('modifyManager', async () => {
    //     await service.manager.modifyManager({
    //         name : '修改',
    //         id : '1e5efcb3-9f9b-4a29-94dd-b542748e2a30',
    //         roles : ['ea480f45-e77f-4794-8f0d-a8ffba10ff11']
    //     })
    // })
    //
    //
    // it('deleteManager', async () => {
    //     await service.manager.deleteManager({
    //         id : ['1e5efcb3-9f9b-4a29-94dd-b542748e2a30']
    //     })
    // })
    //
    // it('deleteRole', async () => {
    //     await service.manager.deleteRole({
    //         id : ['ea480f45-e77f-4794-8f0d-a8ffba10ff11']
    //     })
    // })

})