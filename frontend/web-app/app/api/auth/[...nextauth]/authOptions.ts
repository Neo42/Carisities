import { NextAuthOptions } from "next-auth";
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIdentityServer6({
      id: process.env.DUENDE_IDS6_ID,
      clientId: process.env.DUENDE_IDS6_CLIENT_ID as string,
      clientSecret: process.env.DUENDE_IDS6_CLIENT_SECRET as string,
      issuer: process.env.DUENDE_IDS6_ISSUER,
      authorization: { params: { scope: process.env.DUENDE_IDS6_SCOPE } },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile) {
        token.username = profile.username;
      }
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
};
