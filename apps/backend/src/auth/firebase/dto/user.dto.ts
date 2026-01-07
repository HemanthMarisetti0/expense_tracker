import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Database ID of the user' })
  id: string;

  @ApiProperty({ description: 'Firebase UID of the user' })
  firebaseUid: string;

  @ApiPropertyOptional({ description: 'Email of the user' })
  email?: string;

  @ApiPropertyOptional({ description: 'Full name of the user' })
  name?: string;

  @ApiPropertyOptional({ description: 'Timestamp when the user was created' })
  createdAt?: Date;
}
