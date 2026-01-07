import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthGuard } from 'src/firebase/firebase-auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [FirebaseModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
