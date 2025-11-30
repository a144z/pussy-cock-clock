import { CustomClock } from "@/components/custom-clock";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-4 sm:p-8">
      <main className="flex flex-col gap-4 sm:gap-8 items-center w-full max-w-7xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">Pussy C&quot;l&quot;ock</h1>
        <div className="w-full flex justify-center">
          <CustomClock />
        </div>
      </main>
    </div>
  );
}
