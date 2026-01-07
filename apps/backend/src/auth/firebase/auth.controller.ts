import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/firebase/firebase-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async me(@Req() req: any): Promise<UserDto> {
    return this.authService.authMe(req.user);
  }
}
