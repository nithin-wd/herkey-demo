// import { UN_AUTH_POST } from "@/app/actions-server";
import dayjs from "dayjs";
import CredentialsProvider from "next-auth/providers/credentials";

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider(<any>{
      credentials: {},

      async authorize(credentials: any) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const payload = { email, password };
          console.log({ payload })
          // const res = await UN_AUTH_POST(`${baseURL}/api/users/login`, payload);
          const expirationFromNow = dayjs().add(1, "day").toISOString();
          
          const endOfDay = dayjs().endOf("day").toISOString();
          const user = {
            name: "Nithin R Krishnan",
            email: "nithin@webdura.tech",
            accessToken: "khsHdjbsnjedhbzdjbsjfbjhbsjchbsjhbjscbjbscjhbcsjhd",
            expires: dayjs(expirationFromNow).isBefore(dayjs(endOfDay))
              ? expirationFromNow
              : endOfDay,
            id: "Nithin1234",
            role: "ADMIN",
          };
          return user;
        } catch (error: any) {
          if (error.errorCode === 400) throw new Error("InvalidCredentials");
          if (error.message.includes("Invalid body"))
            throw new Error("InvalidBody");
          throw new Error(error?.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.expires = user.expires
        token.id = user.id;
        token.role = user.role;
      }
      const currentTime = dayjs();
      const diff = dayjs(token.expires).diff(currentTime, "second"); // 7
      if (diff <= 0) {
        console.log("session invalid");
        return null;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (!token) return null;
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.role = token.role;
      session.expires = token.expires;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    signOut: "/auth/login",
  },
};
export default authOptions;
