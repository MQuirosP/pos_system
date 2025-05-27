import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '@server': path.join(__dirname, 'server'),
  '@controllers': path.join(__dirname, 'controllers'),
  '@routes': path.join(__dirname, 'routes'),
  '@config': path.join(__dirname, 'config'),
  '@middlewares': path.join(__dirname, 'middlewares'),
  '@services': path.join(__dirname, 'services'),
  '@entities': path.join(__dirname, 'database/entities'),
  '@models': path.join(__dirname, 'database/models'),
  '@dtos': path.join(__dirname, 'dtos'),
  '@utils': path.join(__dirname, 'utils'),
  '@decorators': path.join(__dirname, 'decorators'),
  '@interfaces': path.join(__dirname, 'interfaces'),
  '@enums': path.join(__dirname, 'enums'),
  '@migrations': path.join(__dirname, 'database/migrations'),
});
