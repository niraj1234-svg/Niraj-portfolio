export interface StatItem {
  id: string;
  value: string;
  label: string;
  detail: string;
  tag: string;
}

export const QUICK_STATS: StatItem[] = [
  {
    id: 'education',
    value: '2024–2027',
    label: 'B.Tech IT',
    detail: 'Guru Ghasidas Vishwavidyalaya (GGV)',
    tag: 'Academic Track',
  },
  {
    id: 'venture',
    value: 'Co-Founder',
    label: 'KALA Sportswear',
    detail: 'Print-on-demand e-commerce startup',
    tag: 'Production Venture',
  },
  {
    id: 'orders',
    value: '400–500',
    label: 'Total Orders',
    detail: 'Processed through live production store',
    tag: 'Operational Proof',
  },
  {
    id: 'catalog',
    value: '20',
    label: 'Active Products',
    detail: 'Current dynamic catalog items in stock',
    tag: 'Catalog Inventory',
  },
];
