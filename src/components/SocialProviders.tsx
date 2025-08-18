"use client";

type Provider = "google" | "apple";

type Props = {
  onProviderClick?: (provider: Provider) => void;
};

export default function SocialProviders({ onProviderClick }: Props) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => onProviderClick?.("google")}
        className="w-full inline-flex items-center gap-3 rounded-xl border border-light-300 px-4 py-3 bg-light-100 hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-dark-900/20 transition"
        aria-label="Continue with Google"
      >
        <img src="/google.svg" alt="" className="h-5 w-5" />
        <span className="mx-auto text-dark-900 text-body-medium">Continue with Google</span>
      </button>
      <button
        type="button"
        onClick={() => onProviderClick?.("apple")}
        className="w-full inline-flex items-center gap-3 rounded-xl border border-light-300 px-4 py-3 bg-light-100 hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-dark-900/20 transition"
        aria-label="Continue with Apple"
      >
        <img src="/apple.svg" alt="" className="h-5 w-5" />
        <span className="mx-auto text-dark-900 text-body-medium">Continue with Apple</span>
      </button>
    </div>
  );
}
