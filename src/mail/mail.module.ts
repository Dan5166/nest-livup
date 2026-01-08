import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mail, MailSchema } from './entities/mail.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Mail.name, schema: MailSchema },
    ]),
    MailerModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    transport: {
      host: config.get('MAIL_HOST'),
      port: Number(config.get('MAIL_PORT')),
      secure: false,
      auth: {
        user: config.get('MAIL_USER'),
        pass: config.get('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false, // ✅ SOLUCIÓN
      },
    },
    defaults: {
      from: config.get('MAIL_FROM'),
    },
  }),
}),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
