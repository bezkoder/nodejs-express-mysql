import { Container, CosmosClient, Resource, SqlQuerySpec } from '@azure/cosmos';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Crud } from './db.interface';
import { Tutorial } from './models/tutorial.model';

@Injectable()
export class CosmosService implements Crud {
  private container: Container;
  constructor() {
    const client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT as string,
      key: process.env.COSMOS_PRIMARY_KEY,
    });
    const db = client.database('tutorials');
    this.container = db.container('tutorials');
  }

  async create(newTutorial: Tutorial): Promise<void> {
    await this.container.items.create({ published: false, ...newTutorial });
  }

  async findById(id: string): Promise<Tutorial | null> {
    const item = this.container.item(id, id);
    const { resource } = await item.read<Tutorial>();

    if (resource == null) {
      return null;
    }

    return this.extractTutorial(resource);
  }

  async getAllWith(prefix: string) {
    const querySpec: SqlQuerySpec = {
      query: 'SELECT * from c WHERE STARTSWITH(c.title, @prefix)',
      parameters: [
        {
          name: '@prefix',
          value: prefix,
        },
      ],
    };

    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();
    const result: Tutorial[] = [];

    for (const item of resources) {
      result.push(this.extractTutorial(item as Tutorial & Resource));
    }

    return result;
  }

  async getAll(): Promise<Tutorial[]> {
    const { resources } = await this.container.items.readAll().fetchAll();
    const result: Tutorial[] = [];
    for (const item of resources) {
      result.push(this.extractTutorial(item as Tutorial & Resource));
    }
    return result;
  }

  async getAllPublished(): Promise<Tutorial[]> {
    const querySpec = {
      query: 'SELECT * from c WHERE c.published = @published',
      parameters: [
        {
          name: '@published',
          value: true,
        },
      ],
    };
    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();
    const result: Tutorial[] = [];

    for (const item of resources) {
      result.push(this.extractTutorial(item as Tutorial & Resource));
    }

    return result;
  }

  async updateById(id: string, tutorial: Tutorial): Promise<void> {
    const item = this.container.item(id, id);
    const { resource } = await item.read<Tutorial>();

    if (resource == null) {
      throw new BadRequestException('Item does not exist');
    }

    await item.replace({ ...this.extractTutorial(resource), ...tutorial });
  }

  async remove(id: string): Promise<void> {
    const item = this.container.item(id, id);
    await item.delete();
  }

  async removeAll(): Promise<void> {
    const { resources: items } = await this.container.items
      .readAll()
      .fetchAll();

    for (const item of items) {
      await this.container.item(item.id, item.id).delete();
    }
  }

  private extractTutorial(resource: Tutorial & Resource): Tutorial {
    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      published: resource.published,
    };
  }
}
