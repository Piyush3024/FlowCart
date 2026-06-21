export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background">
      <span className="animate-pulse font-bold font-serif text-2xl tracking-widest">FLOWCART</span>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  );
}
