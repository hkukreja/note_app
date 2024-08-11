import { expect } from 'chai';
import request from 'supertest';
import app from './index.js';
import Notes from './models/notes.model.js';

afterEach(async () => {
    await Notes.deleteMany({});
});

describe('Notes API Integration Tests', () => {
    let testNoteId;

    it('should add a note', async () => {
        const response = await request(app)
            .post('/api/v1/notes/add-note')
            .send({ title: 'Test Note', body: 'This is a test note.' });

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Note Added!');
    });

    it('should update a note', async () => {
        const note = await Notes.create({ title: 'Title', body: 'Body' });

        testNoteId = note._id;

        const response = await request(app)
            .put(`/api/v1/notes/update-note/${testNoteId}`)
            .send({ title: 'Updated Title', body: 'Updated body' });

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Note Updated!');
        expect(response.body.data.title).to.equal('Updated Title');
    });

    it('should get a note by ID', async () => {
        const note = await Notes.create({ title: 'Title', body: 'Body' });

        testNoteId = note._id;

        const response = await request(app)
            .get(`/api/v1/notes/note/${testNoteId}`);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Note!');
        expect(response.body.data.title).to.equal('Title');
    });

    it('should get all notes', async () => {
        await Notes.create({ title: 'Note 1', body: 'Body 1' });
        await Notes.create({ title: 'Note 2', body: 'Body 2' });

        const response = await request(app)
            .get('/api/v1/notes/notes');

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Notes List!');
        expect(response.body.data).to.be.an('array').that.is.not.empty;
    });

    it('should delete a note', async () => {
        const note = await Notes.create({ title: 'Title', body: 'Body' });

        testNoteId = note._id;

        const response = await request(app)
            .delete(`/api/v1/notes/${testNoteId}`);

        expect(response.status).to.equal(204);
    });
});