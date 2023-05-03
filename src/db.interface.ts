import { Tutorial } from './models/tutorial.model';

export interface Crud {
  create(newTutorial: Tutorial);

  findById(id: string): Promise<Tutorial>;

  getAll(title: string): Promise<Tutorial[]>;

  getAllPublished(): Promise<Tutorial[]>;

  updateById(id: string, tutorial: Tutorial): Promise<void>;

  remove(id: string): Promise<void>;

  removeAll(): Promise<void>;
}
