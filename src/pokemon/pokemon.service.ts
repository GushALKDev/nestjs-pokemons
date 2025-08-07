import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto, UpdatePokemonDto } from './dto/index';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private defaultLimit: number;
  private defaultOffset: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.getOrThrow('defaultLimit');
    this.defaultOffset = this.configService.getOrThrow('defaultOffset');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    }
    catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {
      limit = this.defaultLimit,
      offset = this.defaultOffset
    } = paginationDto;

    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({ number: 1 })
    .select('-__v'); // Exclude __v field from the response
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ number: +term });

    if (!pokemon && isValidObjectId(term)) pokemon = await this.pokemonModel.findById(term);

    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or number "${ term }" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
        updatePokemonDto.name = updatePokemonDto.name.trim();
      }
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return {...pokemon.toJSON(), ...updatePokemonDto};
    }
    catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) throw new NotFoundException(`Pokemon with id "${id}" not found`);

    return `The pokemon with id "${id}" has been removed`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists in the DB. ${ JSON.stringify(error.keyValue) }`);
    }
    
    if (error.name === 'CastError') {
      throw new BadRequestException(`Invalid value for ${error.path}: ${error.value}`);
    }
    
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}