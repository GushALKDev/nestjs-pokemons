import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response-interface';
import axios, { AxiosInstance } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { HttpAdapter } from 'src/common/adapters/http.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: HttpAdapter
  ) {}

  async executeSeed() {

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    await this.pokemonModel.deleteMany({});

    const pokemonsToInsert: { name: string, number: number }[] = [];

    data.results.forEach(({ name, url }) => {
      
      const segments = url.split('/');
      const number: number = +parseInt(segments[segments.length - 2]);
      console.log({ name, number });

      pokemonsToInsert.push({ name, number });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    console.log(`${pokemonsToInsert.length} pokemons inserted`);
    return pokemonsToInsert;
  }
}
