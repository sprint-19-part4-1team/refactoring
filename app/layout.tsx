import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import './globals.css';

export const metadata: Metadata = {
  title: 'Refactoring',
  description: '안티 패턴 분리하기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <ToastContainer />
      <body>{children}</body>
    </html>
  );
}
