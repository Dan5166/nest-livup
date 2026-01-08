import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MailModule } from 'src/mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './entities/report.entity';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [
    MongooseModule.forFeature([
          { name: Report.name, schema: ReportSchema },
        ]),
    MailModule
  ]
})
export class ReportModule {}
