import { type PropsWithChildren } from 'react';

export default function ScrollingMainContent({ children }: PropsWithChildren) {
  return (
    <div className="h-full w-full overflow-auto relative">
      <div className="p-4 md:p-8">{children}</div>
    </div>
  );
}
