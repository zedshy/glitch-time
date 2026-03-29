import { Suspense } from "react"
import { SuccessPageContent } from "./success-content"

function SuccessFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full rounded-lg border border-neon-cyan/30 bg-card p-12 text-center text-muted-foreground">
        Loading confirmation…
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessPageContent />
    </Suspense>
  )
}
