import { ZodError } from 'zod';
import { HandleHttp } from '../services/handleErrors.js';

const validated = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
      files: req.files,
    });
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      const msg = e.issues.map((issue) => issue.message);

      HandleHttp(res, { status: 400, msg });
    }
  }
};

export { validated };
