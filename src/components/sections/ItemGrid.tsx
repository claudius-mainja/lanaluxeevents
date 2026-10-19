import type { CatalogueItem } from "@/content/catalogue";
import ItemCard from "@/components/catalogue/ItemCard";

export default function ItemGrid({ items }: { items: CatalogueItem[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  );
}
