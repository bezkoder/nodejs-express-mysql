import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { Tutorial } from './models/tutorial.model';

@Controller('tutorials')
export class TutorialController {
  constructor(private readonly service: CosmosService) {}

  @Post()
  async create(@Body() tutorial: Tutorial) {
    await this.service.create(tutorial);
  }

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.remove(id);
  }
}
