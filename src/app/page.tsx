import { CustomClock } from "@/components/custom-clock";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-center">Pussy C&quot;l&quot;ock</h1>
        <CustomClock size={1000} />
      </main>
    </div>
  );
}
