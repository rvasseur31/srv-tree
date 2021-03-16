import { Router } from 'express';

interface IBaseController {
  path: string;
  router: Router;
}

export default IBaseController;