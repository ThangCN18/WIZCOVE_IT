import { ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {}
