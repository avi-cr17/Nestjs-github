import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
import { updateToken } from "./token.service";






@Injectable()
export class AppService {





  // returning details of who logged in
  githubLogin(req){
    
    updateToken(req.user.accessToken);

    if(!req)
    return {      
        message:"User not found",           
    }

    return {
      message:"Repo Created",
      user : req.user.username,
      token : req.user.accessToken
    }

  }
  



  // creating repo using auth token and reponame
  createRepo( token : string) : Promise<any>{
    
    const octokit = new Octokit({
      auth : token
    })
     const response = octokit.request('POST /user/repos', {
    name : "hello3",
    private : false
    })
    
    return response;
      
  }


  


  // adding files in the repo
  addFiles(req){

    const octokit = new Octokit({
      auth : req.user.accessToken 
    })

    const file = octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: req.user.username,
      repo: "hello3",
      path: "filename.py",
      message: "first file",
      committer: {
        name: 'nest js test app',
        email: ' someone@github.com'
      },
      content: Buffer.from("printf('Hello world')").toString('base64')
    }).then((res)=>{console.log(res); return res.status })
    .catch((err)=>{console.log(err); return err.status})

  }




}

