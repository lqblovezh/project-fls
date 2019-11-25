import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('digitalbooks', () => {
    let data = {
        id : "12312",
        name : "sdad"
    }
    it('addBookGroup',async () => {
        await service.digitalbooks.addBookGroup(data)
    })

    it('modifyBookGroup',async () => {
        await service.digitalbooks.modifyBookGroup(data)
    })

    it('deleteBookGroup',async () => {
        await service.digitalbooks.deleteBookGroup({
            id : "12312"
        })
    })

    it('listBookGroup',async () => {
        await service.digitalbooks.listBookGroup()
    })

    it('moveBookGroup',async () => {
        await service.digitalbooks.moveBookGroup({
            old_group_id : '12315',
            new_group_id : 'all',
            rel_id : ['1234']
        })
    })

    it('detailDigitalBook',async () => {
        await service.digitalbooks.detailDigitalBook({
            id : '12315'
        })
    })

    it('deleteDigitalBook',async () => {
        await service.digitalbooks.deleteDigitalBook({
            id : ['12315']
        })
    })

    it('addDigitalBook',async () => {
        await service.digitalbooks.addDigitalBook({
            name : 'dsadas'
        })
    })

    it('listDigitalBook',async () => {
        await service.digitalbooks.listDigitalBook()
    })

    it('urgentDigitalBook',async () => {
        await service.digitalbooks.urgentDigitalBook({
            id : ['5151']
        })
    })

    it('modifyDigitalBook',async () => {
        await service.digitalbooks.modifyDigitalBook({
            id : "6181515"
        })
    })

    it('issuance',async () => {
        await service.digitalbooks.issuance({
            id : "6181515"
        })
    })

    it('removeConstitute',async () => {
        await service.digitalbooks.removeConstitute({
            data : [
                {
                    tid : '',
                    id : '',
                    type : ''
                }
            ]
        })
    })

    it('synchronization',async () => {
        await service.digitalbooks.synchronization({
            id : "6181515"
        })
    })
    it('reordering',async () => {
        await service.digitalbooks.reordering({
            _id : "6181515",
            type : "2",
            number : "1",
            t_id : "51156154",
            up_down : 'up'
        })
    })
    it('stick',async () => {
        await service.digitalbooks.stick({
            _id : "6181515",
            type : "2",
            number : "1",
            t_id : "51156154"
        })
    })

    it('listAnchor',async () => {
        await service.digitalbooks.listAnchor()
    })

    it('delAnchor',async () => {
        await service.digitalbooks.delAnchor({
            id : ['52415']
        })
    })
})
