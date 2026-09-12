export default function Background() {
  return (
    <div id="rain-container" className="fixed inset-0 -z-10 overflow-hidden">
      {/* <RainyWindowBackground /> */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0
          h-full w-full
          object-cover
          scale-105
          blur-md
          z-0
        "
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
