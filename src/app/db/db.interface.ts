import { Tutorial } from "../models/tutorial.model";

type Result = (err: Error | Error | null, data: any) => unknown;

export interface Database {
  create(newTutorial: Tutorial, result: Result): void;

  findById(id: string, result: Result): void;

  getAll(title: string, result: Result): void;

  getAllPublished(result: Result): void;

  updateById(id: string, tutorial: Tutorial, result: Result): void;

  remove(id: string, result: Result): void;

  removeAll(result: Result): void;
}
