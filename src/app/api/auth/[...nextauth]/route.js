import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from "@/api/users/users"
// import Email from "next-auth/providers/email"


const handler = NextAuth({
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET, 
        // }),

        // Email({
        //     server: {
        //       host: process.env.SMTP_HOST,
        //       port: Number(process.env.SMTP_PORT),
        //       auth: {
        //         user: process.env.SMTP_USER,
        //         pass: process.env.SMTP_PASSWORD,
        //       },
        //     },
        //     from: process.env.EMAIL_FROM,
        //   }),

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Nom utilisateur", type: "text", placeholder: "jsmith" },
              password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials, req) {
          
              const res = await loginUser({
                email: credentials.email,
                password: credentials.password,
              });

              console.log("response login ::", res?.data);

              const user = res?.data;
      
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user;
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null;
      
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            },
          }),

        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET, 
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET, 
        }),

    ],
    callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
    
        async session({ session, token }) {
          session.user = token ;
          return session;
        },
      },
})

export { handler as GET, handler as POST }