import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'User ID who owns the category',
    example: 'c9f1e2a3-7b6c-4d2a-9c3e-123456789abc',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Food',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Optional color for charts',
    required: false,
    example: '#FF0000',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'Optional icon name for UI',
    required: false,
    example: 'utensils',
  })
  @IsOptional()
  @IsString()
  icon?: string;
}
