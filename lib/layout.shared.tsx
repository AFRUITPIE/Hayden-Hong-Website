import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <span className="h-5 w-5 overflow-hidden rounded-full">
            <Image
              src="/assets/hayden.jpeg"
              alt="Hayden Hong"
              width={20}
              height={20}
              priority
              sizes="20px"
              className="h-full w-full object-cover"
            />
          </span>
          Hayden Hong
        </span>
      ),
    },
  };
}
