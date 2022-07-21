import {Controller, Post, Body, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import{Response} from 'express'
import {AuthLoginDto} from "./dto/auth-login.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post('/login')
  async register(
      @Body() req: AuthLoginDto,
      @Res() res: Response,

  ): Promise<any>{
    return this.authService.login(req, res)
  }

}
