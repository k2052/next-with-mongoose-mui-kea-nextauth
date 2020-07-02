/// pages/api/auth/[...nextauth],js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
const options = {
  site: process.env.SITE || "http://localhost:3000",
  secret: "butts",
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: {
    type: 'mongodb',
    url: process.env.DATABASE_URL,
  },
};

export default (req, res) => NextAuth(req, res, options);
