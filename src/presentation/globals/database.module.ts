import { TypeOrmFactory } from '@/infra/fatory/TypeOrm/TypeOrmRepositoryFactory';
import { Module } from '@nestjs/common';

@Module({
  imports:[],
  providers: [
    {
      provide: 'REPOSITORY_FACTORY',
      useFactory:()=> TypeOrmFactory.getInstance()
    },
    {
      provide: 'DAO_FACTORY',
      useFactory:()=> TypeOrmFactory.getInstance()
    },
  ],
  exports: ['REPOSITORY_FACTORY', 'DAO_FACTORY']
})
export class DatabaseModule {}