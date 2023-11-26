import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

import { jwtDecode } from "jwt-decode";

import { log } from "console";
const options = {
  secret: process.env.AUTH_SECRET,
  logger: {
    error(code, metadata) {
      log("ERROR ", code, metadata);
    },
    warn(code) {
      log("WARN ", code);
    },
    debug(code, metadata) {
      log.debug("DEBUG ", code, metadata);
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "meine.email@domain.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // The 'url' is pointing to a Rails API endpoint which returns a JWT Token
        const url = `https://afefitness2023.azurewebsites.net/api/Users/login`;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const user = await res.json();
        // console.log(user);
        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log("Successful login. User data:", user);
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      console.log(user);
      // This user return by provider {} as you mentioned above MY CONTENT {token:}
      if (user) {
        if (user.jwt) {
          log("JWT DECODE", user.jwt);
          const { Name, Role, UserId } = jwtDecode(user.jwt);
          console.log("ROLE", Role);
          token = { token: user.jwt, role: Role, userId: UserId };

          // userId = UserId;

          log(user.jwt);
        }
      }
      return token;
    },

    // session: {
    //   strategy: "jwt",
    // },

    // That token store in session
    session({ session, token }) {
      console.log("SESSION");
      //this token return above jwt()
      //   session.accessToken = token.accessToken;
      console.log("TOKEN TOKEN", token.token);
      session.token = token.token;
      session.role = token.role;
      session.userId = token.userId;
      // if you want to add user details info
      //   session.user = { name: "name", email: "email" }; //this user info get via API call or decode token. Anything you want you can add
      return session;
    },
    pages: {
      signIn: "/login",
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
