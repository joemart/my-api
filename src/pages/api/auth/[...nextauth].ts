import { DefaultSession, NextAuthOptions, User, getServerSession } from "next-auth";
import BattleNetProvider from "next-auth/providers/battlenet"
import GithubProvider from "next-auth/providers/github"
import NextAuth from "next-auth/next";

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session { 
      accessToken?: string
    }
  }

export const authConfig: NextAuthOptions = {
    providers: [
        BattleNetProvider({
            clientId: process.env.BNET_CLIENT_ID as string,
            clientSecret: process.env.BNET_CLIENT_SECRET as string,
            issuer: "https://us.battle.net/oauth",
 
            authorization: {
                params:{scope:"openid wow.profile"}
            },

            wellKnown: "https://oauth.battle.net/.well-known/openid-configuration"

        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    callbacks: {
    async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
        token.accessToken = account.access_token
        }
        return token
    },
    async session({ session, token, user } )  {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken as string
        return session
    }
    },
    secret: process.env.JWT_SECRET
}

export default NextAuth(authConfig)