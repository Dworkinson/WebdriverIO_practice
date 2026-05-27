import { expect } from 'chai';
import axios from 'axios';

const api = axios.create({
    validateStatus: () => true,
    baseURL: 'https://practice.expandtesting.com/status-codes'
});


describe('Page codes: ', async () => {
    it('could receive page codes', async () => {
        expect((await api.get('/200')).status).to.be.equal(200);
        expect((await api.get('/301')).status).to.be.equal(301);
        expect((await api.get('/404')).status).to.be.equal(404);
        expect((await api.get('/500')).status).to.be.equal(500);
    })
});