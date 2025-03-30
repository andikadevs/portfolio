export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center backdrop-blur-md bg-background/70 dark:bg-dark/70 z-50">
      <div className="relative flex flex-col items-center">
        {/* Animated container with gradient background */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-background to-foreground dark:from-dark dark:to-foreground animate-gradient p-1">
          {/* Spinner container */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-background dark:bg-dark flex items-center justify-center">
            {/* Spinner ring */}
            <div
              className="absolute w-[90%] h-[90%] rounded-full border-4 border-transparent border-t-[var(--accent)] animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
          </div>
        </div>

        {/* Text below spinner */}
        <p className="mt-6 text-xl font-medium text-text">Loading Portfolio...</p>

        {/* Animated underline with accent color */}
        <div className="h-0.5 bg-[var(--accent)] mt-1 animate-[widthGrow_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
}
