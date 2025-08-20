export const dynamic = "force-dynamic";

import { Card } from "@/components";
import Filters from "@/components/Filters";
import Sort from "@/components/Sort";
import { parseFilterParams } from "@/lib/utils/query";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const parsed = parseFilterParams(sp);
  const { getAllProducts } = await import("@/lib/actions/product");
  const { products, totalCount } = await getAllProducts(parsed);

  const activeBadges: string[] = [];
  (sp.gender ? (Array.isArray(sp.gender) ? sp.gender : [sp.gender]) : []).forEach((g) =>
    activeBadges.push(String(g)[0].toUpperCase() + String(g).slice(1))
  );
  (sp.size ? (Array.isArray(sp.size) ? sp.size : [sp.size]) : []).forEach((s) => activeBadges.push(`Size: ${s}`));
  (sp.color ? (Array.isArray(sp.color) ? sp.color : [sp.color]) : []).forEach((c) =>
    activeBadges.push(String(c)[0].toUpperCase() + String(c).slice(1))
  );
  (sp.price ? (Array.isArray(sp.price) ? sp.price : [sp.price]) : []).forEach((p) => {
    const [min, max] = String(p).split("-");
    const label = min && max ? `$${min} - $${max}` : min && !max ? `Over $${min}` : `$0 - $${max}`;
    activeBadges.push(label);
  });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between py-6">
        <h1 className="text-heading-3 text-dark-900">New ({totalCount})</h1>
        <Sort />
      </header>

      {activeBadges.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeBadges.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="rounded-full border border-light-300 px-3 py-1 text-caption text-dark-900"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      <section className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
        <Filters />
        <div>
          {products.length === 0 ? (
            <div className="rounded-lg border border-light-300 p-8 text-center">
              <p className="text-body text-dark-700">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-6">
              {products.map((p) => {
                const price =
                  p.minPrice !== null && p.maxPrice !== null && p.minPrice !== p.maxPrice
                    ? `$${p.minPrice.toFixed(2)} - $${p.maxPrice.toFixed(2)}`
                    : p.minPrice !== null
                    ? p.minPrice
                    : undefined;
                return (
                  <Card
                    key={p.id}
                    title={p.name}
                    subtitle={p.subtitle ?? undefined}
                    imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                    price={price}
                    href={`/products/${p.id}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
