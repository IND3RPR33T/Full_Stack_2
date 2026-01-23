import Ballpit from "./Ballpit";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Ballpit Background */}
      <div className="absolute inset-0">
        <Ballpit
          count={100}
          gravity={0.5}
          friction={0.9975}
          wallBounce={0.95}
          followCursor
          colors={["#5227FF", "#7cff67", "#ff6b6b"]}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="rounded-xl bg-white/80 dark:bg-black/70 backdrop-blur-md p-8 shadow-lg">
          <h1 className="text-3xl font-bold dark:text-white">
            Theme Toggle SPA
          </h1>
        </div>
      </div>

    </div>
  );
}
