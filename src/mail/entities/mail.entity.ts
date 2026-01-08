import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MailDocument = Mail & Document;

export enum MailStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

@Schema({ timestamps: true }) // createdAt / updatedAt 🔥
export class Mail {
  @Prop({
    required: true,
    index: true,
  })
  to: string; // destinatario

  @Prop({
    required: true,
  })
  subject: string;

  @Prop({
    required: true,
  })
  html: string;

  @Prop()
  text?: string;

  @Prop({
    enum: MailStatus,
    default: MailStatus.PENDING,
    index: true,
  })
  status: MailStatus;

  @Prop()
  error?: string; // mensaje de error si falla

  @Prop({
    index: true,
  })
  relatedEntityId?: string; // reportId, userId, etc.
}

export const MailSchema = SchemaFactory.createForClass(Mail);
