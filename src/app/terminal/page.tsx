import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('@/components/terminal/Terminal'), {
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
