export const metadata = {
    title: 'Jumaia Saleh | جميعه صالح',
    description: 'صفحة المدير الخاصة بجميعه صالح',
    icons: {
      icon: '/images/logo-og.svg', // أو '/logo.png' لو عندك PNG
    },
  }
  
  export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <>{children}</>
  }
  