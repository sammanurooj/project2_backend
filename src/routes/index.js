import express from 'express';
import acl from 'express-acl';
import auth from '../middlewares/auth';
// import UserController from './user/user.controller';

// import UserTablecontroller from './userTable/userTable.controller';
import ApplicationUsercontroller from './applicationUser/applicationUsers.contoller';
import TextSummery from './textSummery/textSummery.controller';

const router = express.Router();

// list of routes to be excluded from authentication and authorization
const aclExcludedRoutes = [
  '/api/users/googleLogin',
  '/api/users/login',
  // '/api/projects/projecttable',
  '/api/projects/:id',
  // '/api/authors/authortable',
  '/api/authors/:id',
  // '/apim ',
  // '/api/userproject/project',
  // '/api/userproject/:id',
  '/api/userproject/createprojectdata',
  // '/api/userproject/update/:id',
  // '/api/userproject/delete/:id',
  '/api/users/signin',
  '/api/users/signup',
  '/api/users/:id',
  '/api/users/applicationusers',
  '/api/text/addtext',

  /^\/api-docs\/.*/,
];

acl.config({
  baseUrl: 'api',
  filename: 'acl.json',
  path: 'src/config',
  roleSearchPath: 'user.role',
});
router.use(auth.required.unless({ path: aclExcludedRoutes }));
router.use(acl.authorize.unless({ path: aclExcludedRoutes }));

// router.use('/users', UserController.getRouter());

router.use('/users', ApplicationUsercontroller.getRouter());
router.use('/text', TextSummery.getRouter());

export default router;
