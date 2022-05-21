import { Controller, Get, Post,UseGuards,Req, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { OctokitService } from 'nestjs-octokit';
import { Octokit } from 'octokit';
import { AuthGuard } from '@nestjs/passport'; 


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  
  }

  //base url
  @Get()
  @Render('index')
    base(){
     console.log("hola")
     return {number :"311"}
  }


  // gihub auth
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubAuth(@Req() req){
    console.log('pressed')
  }



// callback 
 @Get('auth/github/callback')
 @Render('donePage')
 @UseGuards(AuthGuard('github'))
 githubAuthRedirect(@Req() req){
 



  
  this.appService.createRepo(req.user.accessToken)
  .then((err)=>this.appService.addFiles(req))
  .catch((err)=>console.log(err));
  
  

   return {details : this.appService.githubLogin(req)};
 }


 


 

  
     
  




}
