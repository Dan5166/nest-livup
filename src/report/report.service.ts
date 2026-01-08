import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { MailService } from '../mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportDocument } from './entities/report.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class ReportService {

  constructor(
    private readonly mailService: MailService,
    @InjectModel(Report.name)
        private readonly reportModel: Model<ReportDocument>
  ){}

  async create(createReportDto: CreateReportDto) {
    // 1️⃣ Crear reporte
    const report = await this.reportModel.create(createReportDto);

    // 2️⃣ Enviar correo con datos reales
    await this.mailService.notifyCreatedReportEmail(
      report.email,
      report._id.toString(),
      report.name,
    );

    // 3️⃣ Retornar reporte creado
    return report;
  }

  findAll() {
    return `This action returns all report`;
  }

  async findOne(term: string): Promise<Report> {
      let report: Report | null = null;
  
      // Buscar por número
      if (!isNaN(Number(term))) {
        report = await this.reportModel.findOne({ no: Number(term) }).exec();
      }
  
      // Buscar por MongoID
      if (!report && isValidObjectId(term)) {
        report = await this.reportModel.findById(term).exec();
      }
  
      // Buscar por nombre
      if (!report) {
        report = await this.reportModel.findOne({ name: term.toLowerCase().trim() }).exec();
      }
  
      if (!report) {
        throw new NotFoundException(
          `Report with id, name or no "${term}" not found`
        );
      }
  
      return report;
    }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
