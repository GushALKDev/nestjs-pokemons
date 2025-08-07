import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
    // id: string // Mongo nos lo da automáticamente
    @Prop({
        unique: true, // Asegura que no haya dos Pokémon con el mismo nombre
        index: true, // Mejora la búsqueda por nombre
    })
    name: string;

    @Prop({
        unique: true, // Asegura que no haya dos Pokémon con el mismo número
        index: true, // Mejora la búsqueda por número
    })
    number: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);