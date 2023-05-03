import { Container, CosmosClient } from '@azure/cosmos';
import { Injectable } from '@nestjs/common';
import { Crud } from './db.interface';
import { Tutorial } from './models/tutorial.model';

@Injectable()
export class CosmosService implements Crud {
  private container: Container;
  constructor() {
    const client = new CosmosClient({
      endpoint: 'https://tutorials.documents.azure.com:443/', //process.env.COSMOS_ENDPOINT as string,
      key: 'awnEhzZre2ATHa6W9KDTatWN462edXWv3rVLkjAiOnHj6ApQR7BvpHyw7VXpAed185ggKCZ1OYsNACDbivmROA==', //process.env.COSMOS_PRIMARY_KEY,
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

    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      published: resource.published,
    };
  }

  async getAll(): Promise<Tutorial[]> {
    const { resources } = await this.container.items.readAll().fetchAll();
    const result: Tutorial[] = [];
    for await (const item of resources) {
      result.push({
        id: item.id,
        description: item.description,
        title: item.title,
        published: item.published,
      });
    }
    return result;
  }

  getAllPublished(): Promise<Tutorial[]> {
    throw new Error('Method not implemented.');
  }
  updateById(id: string, tutorial: Tutorial): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async remove(id: string): Promise<void> {
    const item = this.container.item(id, id);
    await item.delete();
  }
  removeAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
