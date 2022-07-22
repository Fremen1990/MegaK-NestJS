import {Strategy} from 'passport-jwt'
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {User} from "../user/user.entity";

export interface JwtPayload{
    id:string
}

function cookieExtractor(req:any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){

        super({
            jwtFromRequest:cookieExtractor,
            secretOrKey: 'sijudrfrvnbb8753485vnvudasv 534895vn2983r4nv9nfrvr9873254g2n5349v8n9e8rvhn97534h27985gnvq2 rv99v83qn58g193n5g9nsr0rr8vn0etrng0138n',
        })
    }


    async validate(payload: JwtPayload, done: (error, user)=>void){
        if(!payload || !payload.id){
            return done(new UnauthorizedException(), false);
        }


        const user = await User.findOne({currentTokenId: payload.id});


        if(!user){
            return done(new UnauthorizedException(), false)
        }


        done(null, user)
    }
}

