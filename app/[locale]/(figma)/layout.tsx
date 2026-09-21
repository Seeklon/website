import SkyShell from '@/components/home/SkyShell'

// Pages rebuilt from the Figma file share one shell. Each page ends with its own
// ClosingCta, which marks where the sky turns deep blue.
export default function FigmaLayout({ children }: { children: React.ReactNode }) {
  return <SkyShell>{children}</SkyShell>
}
