import { AuthForm, SocialProviders } from "@/components";

export default function Page() {
  return (
    <div className="space-y-6">
      <p className="text-dark-700 text-footnote text-center md:text-right">
        Already have an account?{" "}
        <a href="/sign-in" className="underline">
          Sign In
        </a>
      </p>

      <div className="space-y-1">
        <h2 className="text-dark-900 text-heading-3 md:text-3xl font-semibold text-center md:text-left">
          Join Nike Today!
        </h2>
        <p className="text-dark-700 text-body text-center md:text-left">
          Create your account to start your fitness journey
        </p>
      </div>

      <SocialProviders />

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-light-300" />
        <span className="text-dark-700 text-footnote">Or sign up with</span>
        <span className="h-px flex-1 bg-light-300" />
      </div>

      <AuthForm mode="sign-up" />
    </div>
  );
}
