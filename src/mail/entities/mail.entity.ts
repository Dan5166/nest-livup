import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Mail extends Document {
  // La extensión le añade todo lo necesario
  // id: string // Mongo me lo da
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
