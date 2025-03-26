import { useState } from "react";
import { Product } from "../data/products";

export function List({
  items,
  renderItem,
}: {
  items: Product[];
  renderItem: (item: Product, isSelected: boolean) => React.ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="grid gap-8">
      <ul>
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return renderItem(item, isSelected);
        })}
      </ul>
      <button onClick={() => setSelectedIndex((i) => (i + 1) % items.length)}>
        Next
      </button>
    </div>
  );
}

export function Row({
  title,
  isSelected,
}: {
  title: string;
  isSelected: boolean;
}) {
  return (
    <li className={isSelected ? "bg-amber-200" : ""} key={title}>
      {title}
    </li>
  );
}
