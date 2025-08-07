import { IsInt, IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
    
    // isInt, isPositive, Min 1
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(1)
    limit?: number;
    
    // isInt, isPositive, Min 0
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    @Min(0)
    offset?: number;
}
