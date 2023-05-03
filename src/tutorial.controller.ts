import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  async getAll(@Query('title') title: string | undefined) {
    if (title == null || title == '') {
      return await this.service.getAll();
    }
    return await this.service.getAllWith(title);
  }

  @Get('published')
  async getPublished() {
    return await this.service.getAllPublished();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.remove(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() tutorial: Tutorial) {
    await this.service.updateById(id, tutorial);
  }

  @Delete()
  async deleteAll() {
    await this.service.removeAll();
  }
}
