import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumberString,
  IsDateString,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Amount of the expense',
    example: '1250.50',
  })
  @IsNumberString()
  amount: string;

  @ApiPropertyOptional({
    description: 'Optional description of the expense',
    example: 'Office stationery purchase',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Date of the expense',
    example: '2026-01-28T10:30:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    description: 'User ID who made the expense',
    example: 'cmk3onv6i00006ovj81hd7awr',
  })
  @IsString()
  userId: string;

  @ApiPropertyOptional({
    description: 'Category ID for the expense',
    example: 'cmkxkao6g0000e0vjkl8wwm39',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Payment method ID used for the expense',
    example: '',
  })
  @IsOptional()
  @IsString()
  paymentMethodId?: string;
}
