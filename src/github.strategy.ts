import { PassportStrategy } from "@nestjs/passport";
import {Strategy,VerifyCallback} from 'passport-github2';

import {  Injectable } from "@nestjs/common";

@Injectable()

export class GithubStrategy extends PassportStrategy(Strategy , 'github'){

    constructor(){
        super({
            clientID: "18a37668a20fac8559d5",
            clientSecret: "e88980f6b7bd336dcf44349acf4148aa9ad44100",
            callbackURL: "http://127.0.0.1:3000/auth/github/callback",
            scope: [ 'user:email,repo,public_repo' ]

        })
    }

    async validate (accesToken : string , refreshToken : string, profile: any , done : VerifyCallback ) : Promise<any>{
            const {username,profileUrl} = profile;
            const user = {
                username: username,
                profileUrl : profileUrl,
                accessToken : accesToken
            }
            done(null,user);
    }

}






