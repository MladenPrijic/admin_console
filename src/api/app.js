const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

const Swagger = new require('./util/swagger');
const swagger = new Swagger(app);

// const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const componentRoutes = require('./routes/component');
const serverRoutes = require('./routes/server');
const cloudProviderRoutes = require('./routes/cloud_provider');
const clientRoutes = require('./routes/client');
const projectRoutes = require('./routes/project');
const roleRoutes = require('./routes/role');
const deploymentRoutes = require('./routes/deployment');
const softwareRoutes = require('./routes/software');
//const subscriptionRoutes = require("./routes/subscription");

//models
const Client = require('./models/client');
const Project = require('./models/project');
const Server = require('./models/server');
const User = require('./models/user');
const Role = require('./models/role');
const ProjectUses = require('./models/project_uses');
const CloudProvider = require('./models/cloud_provider');
const Component = require('./models/component');
const Deployment = require('./models/deployment');
const Software = require('./models/software');

const sequelize = require('./util/database');

//const app = express();

app.disable('x-powered-by');
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/component', componentRoutes);
app.use('/api/server', serverRoutes);
app.use('/api/cloud-provider', cloudProviderRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/deployment', deploymentRoutes);
app.use('/api/software', softwareRoutes);
//app.use("/api/subscription", subscriptionRoutes);

app.use((error, req, res, next) => {
  console.log('error handler');
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || 'Server error.';
  res.status(status).json({ message: message });
});

//associeted
Client.hasMany(Project);
Project.belongsTo(Client);
CloudProvider.hasOne(Server);
Server.belongsTo(CloudProvider);
Project.hasMany(ProjectUses);
ProjectUses.belongsTo(Project);
Software.hasMany(ProjectUses);
ProjectUses.belongsTo(Software);
Deployment.hasMany(ProjectUses);
ProjectUses.belongsTo(Deployment);
Software.belongsToMany(Component, {
  as: 'components',
  through: 'software_component',
  foreignKey: 'software_id',
  timestamps: false,
});
Component.belongsToMany(Software, {
  as: 'softwares',
  through: 'software_component',
  foreignKey: 'component_id',
  timestamps: false,
});
Deployment.belongsToMany(Server, {
  as: 'servers',
  through: 'deployment_server',
  foreignKey: 'deployment_id',
  timestamps: false,
});
Server.belongsToMany(Deployment, {
  as: 'deployments',
  through: 'deployment_server',
  foreignKey: 'server_id',
  timestamps: false,
});

User.belongsToMany(Role, {
  through: 'user_role',
  foreignKey: 'user_id',
  timestamps: false,
});
Role.belongsToMany(User, {
  through: 'user_role',
  foreignKey: 'role_id',
  timestamps: false,
});

if (process.env.NODE_ENV == 'dev') {
  sequelize
    .sync()
    .then(() => {
      swagger.init();
      app.listen(8080);
    })
    .catch(e => {
      console.log(e);
    });
} else {
  app.listen(8080);
}
