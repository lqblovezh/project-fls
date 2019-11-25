import 'isomorphic-fetch'
import * as service from '../../src/index';
import Joi from 'joi';
import chai from 'chai';
let expect = chai.expect;

describe('audit',() => {
    it('modifyAudit',async () => {
        await service.audit.modifyAudit({
            id : '21345'
        })
    })
    it('listAudit',async () => {
        await service.audit.listAudit()
    })
    it('auditPass',async () => {
        await service.audit.auditPass({
            _ids : ['151']
        })
    })
    it('auditReject',async () => {
        await service.audit.auditReject({
            _ids : ['151']
        })
    })
})
