import passport from 'passport';
import { repository } from "../services/Access/Domain/repository";


passport.serializeUser((user, done) => {
  done(undefined, user);
});

passport.deserializeUser(async(user:any, done) => {
  try {
    let newUser:any = {}
    if (user){
      newUser = await repository.findById(user._id);
      user=newUser;
      done(null, user);
    }
  } catch (error) {
    done(error, user);
  }
});

export default passport;
