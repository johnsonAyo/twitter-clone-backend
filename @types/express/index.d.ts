import User from '../../src/models/userModels'

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }
  