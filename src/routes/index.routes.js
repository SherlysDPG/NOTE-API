import { Router } from 'express';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const PATH_ROUTES = path.dirname(__filename);

const cleanFileName = (filename) => {
  const file = filename.split('.').shift();

  return file;
};

readdirSync(PATH_ROUTES).filter((filename) => {
  const cleanName = cleanFileName(filename);

  if (cleanName !== 'index') {
    import(`./${cleanName}.routes.js`).then((module) => {
      router.use(`/${cleanName}`, module.router);
    });
  }
});

export { router };
