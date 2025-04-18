import Providers from 'app/providers';
import './globals.css';
export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="w-full bg-background overflow-hidden">{children}</body>
    </html>
  );
};
export default RootLayout;
