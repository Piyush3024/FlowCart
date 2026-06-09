export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-4">
      <span className="font-serif text-2xl font-bold tracking-widest animate-pulse">FLOWCART</span>
      <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}
