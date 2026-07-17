process.env.NODE_ENV = "test";

const request = require("supertest");
const {MongoMemoryServer} = require("mongodb-memory-server");
const {default: mongoose} = require("mongoose");


// on fait unn moke pour simuler la connexion : 
jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    req.user = {userId: '6a58e381df483c9e75bdbb2d'}; // on met n'importe quel id
    next();
  }
})

const app = require("../app");


let mongoServer;

beforeAll(async() => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {dbName: 'test'});
})

afterAll(async() => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /projects/:id/like', () => {
  it('like un projet', async() => {
    const projectResponse = await request(app)
      .post('/api/projects')
      .send({title: 'Mon projet'})
      .set('Authorization', 'Bearer token');

      const projectId = projectResponse.body._id;

      const res = await request(app)
        .post('/api/projects/' + projectId + '/like')
        .set('Authorization', 'Bearer token');

        // on s'attend à codece que le stauts de la réponse soit : 
        expect(res.statusCode).toBe(200);
        // on s'attend à ce que le tableau de like soit de 1 : 
        expect(res.body.likes).toHaveLength(1);
  });
  it('commente un projet', async() => {
    const projectResponse = await request(app)
      .post('/api/projects')
      .send({title: 'Mon projet'})
      .set('Authorization', 'Bearer token');

      const projectId = projectResponse.body._id;

      const res = await request(app)
        .post('/api/projects/' + projectId + '/comment')
        .send({content: "Mon premier commentaire"})
        .set('Authorization', 'Bearer token');

        // on s'attend à codece que le stauts de la réponse soit : 
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        // on vérifie le commentaire : 
        expect(res.body.content).toBe("Mon premier commentaire");
  });
});

