import { NextAuthMiddlewareOptions } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config: NextAuthMiddlewareOptions & { matcher: string[] } = {
  matcher: ["/session"],
  pages: {
    signIn: "/api/auth/signin",
  },
};
