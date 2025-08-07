import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";

export class CreatePokemonDto {
    
    // isString, isNotEmpty
    @IsString()
    @IsNotEmpty()
    // isLowercase, Min 1, Max 20
    // name: string // Mongo nos lo da automáticamente
    name: string;
    
    // isInt, isPositive, Min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    number: number;
}
