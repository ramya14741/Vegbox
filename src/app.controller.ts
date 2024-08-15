import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
