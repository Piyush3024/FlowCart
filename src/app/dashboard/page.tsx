import type { Metadata } from 'next';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description: 'FlowCart admin dashboard — orders, revenue, and product analytics.',
});

export default function DashboardPage() {
  return <DashboardShell />;
}
