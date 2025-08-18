import { Navbar, Footer } from "@/components";

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
