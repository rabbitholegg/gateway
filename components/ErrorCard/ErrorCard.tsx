import { FaBug } from 'react-icons/fa';

export function ErrorCard({ title, error }: { title: string; error: unknown }) {
  return (
    <div className="h-full w-full items-center">
      <div className="h-full flex flex-col  items-center justify-center p-4">
        <FaBug className="opacity-20" />
        <p className="text-sm font-semibold py-2">{title}</p>
        <code className="text-error text-center bg-error/20 rounded-lg p-2 text-xs">
          {error instanceof Error ? error.message : 'unknown error'}
        </code>
      </div>
    </div>
  );
}
