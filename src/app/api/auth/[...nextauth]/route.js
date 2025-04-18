import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider  from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    CredentialsProvider({
        name:"credentials",
        credentials:{},
        async authorize(credentials){
            try{
                const response=await axios.post("https://instagram-clone-api.fly.dev/sessions",
                credentials)
                if (response.status==200){
                    console.log("logged in sucessfully")
                }
                const user = response.data;
                return user;

                
}
catch(error){
    console.log(error.message)
}
        }

    })
  ],
});

export { handler as GET, handler as POST };
