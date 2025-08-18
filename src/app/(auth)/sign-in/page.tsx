import { AuthForm, SocialProviders } from "@/components";

export default function Page() {
  return (
    <div className="space-y-6">
      <p className="text-dark-700 text-footnote text-center md:text-right">
        New here?{" "}
        <a href="/sign-up" className="underline">
          Create an account
        </a>
      </p>

      <div className="space-y-1">
        <h2 className="text-dark-900 text-heading-3 md:text-3xl font-semibold text-center md:text-left">
          Welcome Back
        </h2>
        <p className="text-dark-700 text-body text-center md:text-left">Sign in to continue</p>
      </div>

      <SocialProviders />

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-light-300" />
        <span className="text-dark-700 text-footnote">Or sign in with</span>
        <span className="h-px flex-1 bg-light-300" />
      </div>

      <AuthForm mode="sign-in" cta="Sign In" />
    </div>
  );
}
