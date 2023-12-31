This is a NextJS project that will use SCSS and an API to display data about [cards](https://rapidapi.com/omgvamp/api/hearthstone/).
[Battle.net api documentation](https://develop.battle.net/documentation/guides)
Add [chartjs](https://www.chartjs.org/)?
Use OAuth 2.0?

Create a client in the [developer portal](https://develop.battle.net/access/clients). Use the Client ID and Client Secret in your app by placing them in
the [...nextauth].ts file as such:

```tsx
export const authConfig: NextAuthOptions = {
  providers: [
    BattleNetProvider({
      clientId: process.env.BNET_CLIENT_ID as string,
      clientSecret: process.env.BNET_CLIENT_SECRET as string,
      issuer: "https://us.battle.net/oauth",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
}
```

NOTE: Make sure that the issuer and the account logging in are from the same region.

There's 2 kinds of OAuth that the `battlenet provider` requests:

1. CLient credentials flow
2. Authorization code flow

`Next-auth` already does the `Authorization code flow` approach.

Use the `jwt` and `session` call back functions to pass the `access token` to the
frontend.

Once we have the `access token` we can start making API calls as long as it's included
in the parameters.

The `WoW` API is the only one working. The `SC2` and `D3` need `{account}`
and `:profileId` in their parameters and for some reason they don't work with the API requests.

A few project references:

1. [border images](https://www.youtube.com/watch?v=ypstT5UfCsk)
