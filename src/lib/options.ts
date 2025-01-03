import { UN_AUTH_POST } from "@/app/actions-server";
import dayjs from "dayjs";
import CredentialsProvider from "next-auth/providers/credentials";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider(<any>{
      credentials: {},
      async authorize(credentials: any) {
        try {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };
          const payload = { username, password };
          const res = await UN_AUTH_POST(`${baseURL}/api/token/`, payload);
          const endOfDay = dayjs().endOf("day").toISOString();
          const user = {
            name: `${res?.data?.user?.first_name} ${res?.data?.user?.last_name}`,
            email: res?.data?.user?.email,
            accessToken: res?.data?.access,
            expires: endOfDay,
            id: res?.data?.user?.id,
            role: "ADMIN",
          };

          return user;
        } catch (error: any) {
          if (error.errorCode === 400) throw new Error("InvalidCredentials");
          throw new Error(error?.detail);
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
    error: "/auth/login",
    signOut: "/auth/login",
  },
};
export default authOptions;
