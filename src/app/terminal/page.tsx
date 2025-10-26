import dynamicImport from 'next/dynamic';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

const Terminal = dynamicImport(() => import('@/components/terminal/Terminal'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-hacker-green font-mono">Loading terminal...</div>
    </div>
  )
});

export default function TerminalPage() {
  return <Terminal />;
}
