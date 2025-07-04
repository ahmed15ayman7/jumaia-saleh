import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return { id: 'admin', name: 'Admin', email: adminEmail };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session = session;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 