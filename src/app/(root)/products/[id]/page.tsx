import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import SizePicker from "@/components/SizePicker";
import CollapsibleSection from "@/components/CollapsibleSection";
import Card from "@/components/Card";

type Variant = {
  id: string;
  label: string;
  hex?: string;
  images: string[];
};

type MockProduct = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  badge?: { label: string; tone?: "red" | "green" | "orange" };
  variants: Variant[];
};

const PRODUCTS: MockProduct[] = [
  {
    id: "air-max-90-se",
    title: "Nike Air Max 90 SE",
    subtitle: "Women's Shoes",
    description:
      "The Air Max 90 stays true to its running roots with the iconic Waffle sole. Stitched overlays and textured accents create the '90s look you love. Complete with romantic hues, its visible Air cushioning adds comfort to your journey.",
    price: 140,
    compareAtPrice: 170,
    badge: { label: "Highly Rated" },
    variants: [
      {
        id: "crimson",
        label: "Dark Team Red/Pure Platinum/White",
        hex: "#7b1b1a",
        images: ["/shoes/shoe-1.jpg", "/shoes/shoe-2.webp", "/shoes/shoe-3.webp", "/shoes/shoe-4.webp"],
      },
      {
        id: "light",
        label: "Light Grey/White",
        hex: "#d9d9d9",
        images: ["/shoes/shoe-5.avif", "/shoes/shoe-6.avif", "/shoes/shoe-7.avif"],
      },
      {
        id: "black",
        label: "Black/White",
        hex: "#111111",
        images: ["/shoes/shoe-8.avif", "/shoes/shoe-9.avif"],
      },
      {
        id: "white",
        label: "Pure Platinum/White",
        hex: "#f5f5f5",
        images: ["/shoes/shoe-10.avif", "/shoes/shoe-11.avif"],
      },
    ],
  },
  {
    id: "air-force-mid-07",
    title: "Nike Air Force 1 Mid '07",
    subtitle: "Men's Shoes",
    description:
      "Legendary AF1 style with mid-cut support. Classic details and durable materials deliver everyday comfort.",
    price: 98.3,
    variants: [
      { id: "white", label: "White/Black", hex: "#ffffff", images: ["/shoes/shoe-12.avif"] },
    ],
  },
  {
    id: "court-vision-low",
    title: "Nike Court Vision Low Next Nature",
    subtitle: "Men's Shoes",
    description: "Retro hoops look, made for today. A classic you can wear everywhere.",
    price: 98.3,
    variants: [{ id: "blk-blue", label: "Black/Blue", hex: "#00a3ff", images: ["/shoes/shoe-13.avif"] }],
  },
  {
    id: "dunk-low-retro",
    title: "Nike Dunk Low Retro",
    subtitle: "Men's Shoes",
    description: "Timeless style with crisp overlays and original team colors.",
    price: 98.3,
    variants: [{ id: "yellow-green", label: "Yellow/Green", hex: "#e2c900", images: ["/shoes/shoe-14.avif"] }],
  },
];

function getProductById(id: string): MockProduct | null {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return notFound();

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : undefined;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-2">
        <section aria-label="Product media" className="order-1 lg:order-none">
          <div className="rounded-xl bg-light-100 ring-1 ring-light-300">
            <div className="p-4 sm:p-6">
              <ProductGallery variants={product.variants} />
            </div>
          </div>
        </section>

        <section aria-label="Product summary" className="order-2 lg:order-none">
          <header className="mb-4">
            <div className="flex items-center gap-2">
              {product.badge?.label && (
                <span className="inline-flex items-center gap-2 rounded-full bg-light-200 px-3 py-1 text-caption text-dark-900 ring-1 ring-light-300">
                  {product.badge.label}
                </span>
              )}
            </div>
            <h1 className="mt-3 text-heading-2 text-dark-900">{product.title}</h1>
            {product.subtitle && <p className="mt-1 text-body text-dark-700">{product.subtitle}</p>}
          </header>

          <div className="mb-4">
            <div className="flex items-baseline gap-3">
              <p className="text-lead text-dark-900">${product.price.toFixed(2)}</p>
              {product.compareAtPrice && (
                <p className="text-body text-dark-700 line-through">${product.compareAtPrice.toFixed(2)}</p>
              )}
              {discount !== undefined && (
                <span className="rounded-full bg-light-200 px-2 py-0.5 text-caption text-[--color-green] ring-1 ring-light-300">
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-body-medium text-dark-900">Select Size</h2>
              <button className="text-caption text-dark-700 underline underline-offset-2">Size Guide</button>
            </div>
            <SizePicker sizes={["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5"]} />
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <button
              className="flex-1 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
              aria-label="Add to bag"
            >
              Add to Bag
            </button>
            <button
              className="flex-1 rounded-full bg-light-100 px-6 py-4 text-body-medium text-dark-900 ring-1 ring-light-300 transition-colors hover:ring-dark-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
              aria-label="Favorite"
            >
              Favorite
            </button>
          </div>

          <div className="divide-y divide-light-300">
            <CollapsibleSection title="Product Details">
              <div className="space-y-3">
                <p className="text-body text-dark-700">{product.description}</p>
                <ul className="list-disc space-y-1 pl-5 text-body text-dark-700">
                  <li>Padded collar</li>
                  <li>Foam midsole</li>
                  <li>Shown: {product.variants[0]?.label}</li>
                </ul>
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Shipping & Returns">
              <p className="text-body text-dark-700">
                Free standard shipping and 30-day returns for Nike Members.
              </p>
            </CollapsibleSection>
            <CollapsibleSection title="Reviews (10)">
              <p className="text-body text-dark-700">There are no reviews yet.</p>
            </CollapsibleSection>
          </div>
        </section>
      </div>

      <section aria-labelledby="you-might-also-like" className="pb-12">
        <h2 id="you-might-also-like" className="mb-6 text-heading-3 text-dark-900">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.slice(1, 4).map((p) => (
            <Card
              key={p.id}
              title={p.title}
              subtitle={p.subtitle}
              imageSrc={p.variants.flatMap((v) => v.images).find(Boolean) ?? "/shoes/shoe-1.jpg"}
              price={p.price}
              href={`/products/${p.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
