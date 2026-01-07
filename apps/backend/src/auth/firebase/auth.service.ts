import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async authMe(firebaseUser: any): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { uid: firebaseUser.uid },
    });
    return {
      ...user,
      firebaseUid: user?.uid,
    } as UserDto;
  }
}
