import { Controller, Post, UseGuards, Request, Get, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { adminloginDto, userDto } from './user.dto';
import { UserService } from './user.service';
import { AdminAuthGuard } from '../auth/firebase-auth.strategy';
import { AuthService } from '../auth/auth.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
  @ApiBody({ type: userDto })

  @Post('validate-and-create-user')
  async validateAndCreateUser(@Request() req) {
    const email  = req.body.Useremail;

    const user = await this.userService.findUserByEmail(email);

    if (user.length>0) {
      return { message: 'User already exists' };
    } else {
      const newUser = await this.userService.createUser(req);
      return { message: 'User created successfully', user: newUser };
    }
  }

  //@ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
  @Get('getCurrentUser') //use this end point in react to get the current user whenever the page refresh happens
  async getCurrentUser(@Request() req) {
    const email = req.body.Useremail;

    const user = await this.userService.findUserByEmail(email);
    return user;
  }

  // @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
  @ApiBody({ type: userDto })
  @Post('validateAdmin')
  async validateAdmin(@Request() req) {
    const email  = req.body.Useremail;

    const user = await this.userService.findUserByEmail(email);

    if (user[0].role !='admin') {
      return { message: 'Admin access denied' };
    } else {
      return {message: 'Admin granted'};
    }
  }




  @Post('validate-and-create-Admin')
  @ApiBody({ type: userDto })
  async validateAndCreateAdmin(@Request() req) {
    const email  = req.body.email;

    const user = await this.userService.findUserByEmail(email);

    if (user.length>0 && user.role!= 'customer') {
      return { message: 'Admin already exists' };
    } else {
      const newUser = await this.userService.createAdmin(req);
      return { message: 'Admin created successfully', user: newUser };
    }
  }


  
  @UseGuards(AuthGuard('veg-admin'))
   @ApiBody({type:adminloginDto})
  
  @Post('adminLogin')
  //@UseGuards(AuthGuard('veg-admin'))
  async adminLogin(@Request() req){
    try{
      return this.authService.adminLogin(req);
    }
    catch(e){
      throw new HttpException({
        message:e.message,
      },
      HttpStatus.BAD_REQUEST)
    }
  }


  //@ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('veg-admin'))
  @ApiBody({ type: adminloginDto })

  @Post('validateAndCreateAd')
  async validateAndCreateAd(@Request() req) {
    const email  = req.body.Useremail;

    const user = await this.userService.findUserByEmail(email);

    if (user.length>0) {
      return { message: 'User already exists' };
    } else {
      const newUser = await this.userService.createUser(req);
      return { message: 'User created successfully', user: newUser };
    }
  }
}
