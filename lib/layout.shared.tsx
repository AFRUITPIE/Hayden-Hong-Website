import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AnimatedInitialsBase } from '@/components/animated-initials';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <AnimatedInitialsBase
          className="flex items-center text-fd-foreground"
          svgClassName="block h-[1.2rem] w-auto overflow-visible"
          aria-label="Hayden Hong"
        />
      ),
    },
  };
}
