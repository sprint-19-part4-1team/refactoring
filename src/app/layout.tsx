import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Refactoring",
  description: "유저 코드 리팩토링하기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
