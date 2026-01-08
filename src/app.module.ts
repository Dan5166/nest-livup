import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportModule } from './report/report.module';
import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    

    MongooseModule.forRoot('mongodb://localhost:27017/nest-livup'),

    PokemonModule,

    ReportModule,

    AiModule,

    AuthModule,

    MailModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {}
