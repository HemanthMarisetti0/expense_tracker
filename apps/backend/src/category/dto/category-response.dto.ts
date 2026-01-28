import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ description: 'Unique ID of the category' })
  id: string;

  @ApiProperty({ description: 'Name of the category' })
  name: string;

  @ApiProperty({
    description: 'Optional color for the category',
    required: false,
  })
  color?: string;

  @ApiProperty({
    description: 'Optional icon for the category',
    required: false,
  })
  icon?: string;

  @ApiProperty({ description: 'Date when the category was created' })
  createdAt: Date;
}
