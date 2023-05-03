import { Module } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { TutorialController } from './tutorial.controller';

@Module({
  imports: [],
  controllers: [TutorialController],
  providers: [CosmosService],
})
export class AppModule {}
