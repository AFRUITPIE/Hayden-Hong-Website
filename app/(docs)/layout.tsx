import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

type DocsLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: DocsLayoutProps) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{ defaultOpenLevel: 3 }}
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
