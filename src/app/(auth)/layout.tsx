export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-dvh grid grid-cols-1 md:grid-cols-2 bg-light-100">
      <div className="hidden md:flex flex-col justify-between bg-dark-900 text-light-100 p-8">
        <div className="h-8 w-8 rounded-md bg-orange flex items-center justify-center">
          <span className="sr-only">Logo</span>
        </div>
        <div className="space-y-6 max-w-[36rem]">
          <div className="space-y-3">
            <h1 className="text-heading-2 md:text-heading-1">Just Do It</h1>
            <p className="text-lead text-light-100/80">
              Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
            </p>
          </div>
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-light-100/70"></span>
            <span className="h-2 w-2 rounded-full bg-light-100/70"></span>
            <span className="h-2 w-2 rounded-full bg-light-100/70"></span>
          </div>
          <p className="text-footnote text-light-100/60">© 2024 Nike. All rights reserved.</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-[480px]">{children}</div>
      </div>
    </section>
  );
}
