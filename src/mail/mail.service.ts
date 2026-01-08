import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailDto } from './dto/create-mail.dto';
import { Mail, MailDocument } from './entities/mail.entity';
import { MailStatus } from './enums/mail-status.enum';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(Mail.name)
    private readonly mailModel: Model<MailDocument>,
  ) {}

  /**
   * Crea un registro en la base de datos
   */
  async create(createMailDto: CreateMailDto) {
    return this.mailModel.create(createMailDto);
  }

  /**
   * Orquestador: Guarda en DB y envía el correo
   */
  private async send(dto: CreateMailDto) {
    // 1. Guardamos el registro en la base de datos (por defecto suele ser 'pending' o 'sent')
    const mailRecord = await this.create({
      ...dto,
      status: dto.status || MailStatus.SENT, 
    });

    // 2. Enviamos el correo electrónico
    // Extraemos campos que no pertenecen a la configuración de MailerService (como relatedEntityId)
    const { to, subject, html, text } = dto;

    await this.mailerService.sendMail({
      to,
      subject,
      html,
      text,
    });

    return mailRecord;
  }

  // --- Métodos de conveniencia ---

  async sendTestEmail(to: string) {
    return this.send({
      to,
      subject: 'Correo de prueba 🚀',
      html: '<b>Este es un correo enviado desde NestJS</b>',
      text: 'Este es un correo enviado desde NestJS',
    });
  }

  async sendWelcomeEmail(to: string) {
    return this.send({
      to,
      subject: 'Bienvenido 🎉',
      html: '<h1>Bienvenido a la app</h1>',
    });
  }

  async notifyCreatedReportEmail(to: string, reportId: string, client: string) {
    return this.send({
      to,
      subject: `✅ Reporte para : ${ client } creado correctamente (${reportId})`,
      relatedEntityId: reportId, // Guardamos la relación en la DB
      html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f6f8;
        padding: 40px;
      ">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            overflow: hidden;
          "
        >
          <!-- Header -->
          <tr>
            <td
              style="
                background: linear-gradient(135deg, #4f46e5, #6366f1);
                color: #ffffff;
                padding: 24px;
                text-align: center;
              "
            >
              <h1 style="margin: 0; font-size: 24px;">
                📊 Reporte creado
              </h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">
                Tu reporte se generó exitosamente
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 16px; color: #374151;">
                Hola,
              </p>

              <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                El reporte ha sido creado correctamente con los siguientes datos:
              </p>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  margin: 24px 0;
                  background-color: #f9fafb;
                  border-radius: 8px;
                "
              >
                <tr>
                  <td style="padding: 12px 16px; color: #6b7280;">
                    <strong>ID del reporte</strong>
                  </td>
                  <td style="padding: 12px 16px; color: #111827;">
                    ${reportId}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; color: #6b7280;">
                    <strong>Cliente</strong>
                  </td>
                  <td style="padding: 12px 16px; color: #111827;">
                    ${client}
                  </td>
                </tr>
              </table>

              <p style="font-size: 15px; color: #4b5563;">
                Si necesitas revisar o descargar el reporte, puedes hacerlo desde la plataforma.
              </p>

              <!-- Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a
                  href="https://app.com/reports/${reportId}"
                  style="
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #4f46e5;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 999px;
                    font-weight: bold;
                    font-size: 15px;
                  "
                >
                  Ver reporte
                </a>
              </div>

              <p style="font-size: 14px; color: #6b7280;">
                Si no reconoces esta acción, puedes ignorar este correo.
              </p>

              <p style="font-size: 14px; color: #6b7280;">
                — El equipo de <strong>Nest App</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                background-color: #f9fafb;
                text-align: center;
                padding: 16px;
                font-size: 12px;
                color: #9ca3af;
              "
            >
              © ${new Date().getFullYear()} Nest App. Todos los derechos reservados.
            </td>
          </tr>
        </table>
      </div>
    `,
    });
  }

  async sendPasswordReset(to: string, token: string) {
    return this.send({
      to,
      subject: 'Recuperar contraseña',
      html: `<a href="https://app.com/reset?token=${token}">Recuperar contraseña</a>`,
    });
  }
}