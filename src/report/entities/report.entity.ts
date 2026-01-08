import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  // ======================
  // DATOS DEL PACIENTE
  // ======================

  @Prop({
    required: true,
    index: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    uppercase: true,
    trim: true,
  })
  rut: string;

  @Prop({
    required: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    min: 0,
    max: 120,
  })
  age: number;

  @Prop({
    required: true,
    trim: true,
  })
  phone: string;

  // ======================
  // CONTENIDO DEL REPORTE
  // ======================

  @Prop({
    required: true,
  })
  description: string;

  // ======================
  // METADATA
  // ======================

  @Prop({
    index: true,
  })
  professionalId?: string;

  @Prop({
    default: 'first-interview',
    index: true,
  })
  type: string; // por si después hay otros tipos

  @Prop({
    default: 1,
  })
  version: number;

  @Prop({
    default: false,
    index: true,
  })
  archived: boolean;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
