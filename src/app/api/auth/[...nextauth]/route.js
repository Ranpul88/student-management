import NextAuth from "next-auth";

export const authOptions = {
    callbacks: {
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };