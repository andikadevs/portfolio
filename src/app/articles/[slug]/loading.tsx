export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-3/4 bg-foreground/10 rounded-md"></div>
          <div className="h-4 w-1/3 bg-foreground/10 rounded-md"></div>
          <div className="h-96 w-full bg-foreground/10 rounded-lg mt-8"></div>
          <div className="space-y-3 mt-8">
            <div className="h-4 w-full bg-foreground/10 rounded-md"></div>
            <div className="h-4 w-full bg-foreground/10 rounded-md"></div>
            <div className="h-4 w-3/4 bg-foreground/10 rounded-md"></div>
            <div className="h-4 w-full bg-foreground/10 rounded-md"></div>
            <div className="h-4 w-1/2 bg-foreground/10 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
