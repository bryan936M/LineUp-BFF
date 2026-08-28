import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
  type VerifyCallback,
} from "passport-google-oauth20";
import { googleAuthConfig } from "../../env.config";
import { UserRepository } from "../../shared/db/repository/user.repository";

const users = new UserRepository();

passport.use(
  new GoogleStrategy(
    {
      clientID: googleAuthConfig.clientId,
      clientSecret: googleAuthConfig.clientSecret,
      callbackURL: googleAuthConfig.callbackURL,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(
            new Error(
              "Google account profile must yield a primary email address",
            ),
          );
        }

        let user = await users.findByEmail(email);
        if (!user) {
          // TODO: Check displayName doesn't already exist
          const userRecord = {
            email,
            displayName: profile.displayName,
            googleSubject: profile.id,
            avatarUrl: profile.profileUrl,
          };
          user = await users.createUser(userRecord);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export default passport;
