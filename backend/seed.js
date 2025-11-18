const connectDB = require('./config/db');
const Project = require('./models/Project');
const Client = require('./models/Client');

async function seed(){
  await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/landing-admin');
  await Project.deleteMany({});
  await Client.deleteMany({});
  await Project.insertMany([
    {name:'Project A', description:'Short description for A', image:''},
    {name:'Project B', description:'Short description for B', image:''}
  ]);
  await Client.insertMany([
    {name:'Alice', designation:'CEO', description:'Loves our work', image:''},
    {name:'Bob', designation:'Designer', description:'Great collaborator', image:''}
  ]);
  console.log('Seed done');
  process.exit(0);
}
seed();
