/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect,
   ScrollEngine, CustomCursor, Loader, TopBar, DropMenu,
   VIntro, VHero, VPillars, VLogos, VMarquee, VManifesto, VHowItWorks, VStats, VLife, VApply,
   VCases, VTestimonials, VForFounders, VFounderPlatform, VFooter */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "fontPair": "instrument-geist",
  "orange": "#E85420",
  "cursor": true,
  "loader": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
  }, [t.theme]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--orange-500", t.orange);
    root.style.setProperty("--accent", t.orange);
  }, [t.orange]);

  React.useEffect(() => {
    const root = document.documentElement;
    const pairs = {
      "instrument-geist": { serif: '"Instrument Serif", Georgia, serif', sans: '"Geist", "Inter", system-ui, sans-serif' },
      "fraunces-inter":   { serif: '"Fraunces", Georgia, serif',          sans: '"Inter", system-ui, sans-serif' },
      "geist-only":       { serif: '"Geist", "Inter", system-ui, sans-serif', sans: '"Geist", "Inter", system-ui, sans-serif' },
    };
    const p = pairs[t.fontPair] || pairs["instrument-geist"];
    root.style.setProperty("--font-serif", p.serif);
    root.style.setProperty("--font-sans", p.sans);
  }, [t.fontPair]);

  return (
    <>
      {t.loader && <Loader />}
      {t.cursor && <CustomCursor />}
      <ScrollEngine />
      <TopBar menuOpen={menuOpen} onMenuToggle={setMenuOpen} />
      <DropMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <VHero />
        <VMarquee />
        <VCases />
        <VTestimonials />
        <VPillars />
        <VForFounders />
        <VLife />
        <VFounderPlatform />
        <VManifesto />
        <VHowItWorks />
        <VApply />
      </main>
      <VFooter />
      {/* Estacionadas até existir conteúdo real (código preservado):
          <VAudienceIntent /> <VCommunity /> <VEvents /> <VMosaic />
          <VNotThis /> <VBlog /> <VBigStatement /> */}

      <TweaksPanel title="Quadrado Central · Tweaks">
        <TweakSection label="Tema" />
        <TweakRadio label="Modo" value={t.theme}
          options={["dark", "light"]}
          onChange={(v) => setTweak("theme", v)} />

        <TweakSection label="Tipografia" />
        <TweakSelect label="Combinação" value={t.fontPair}
          options={[
            { value: "instrument-geist", label: "Instrument Serif + Geist" },
            { value: "fraunces-inter",   label: "Fraunces + Inter" },
            { value: "geist-only",       label: "Geist (sans only)" },
          ]}
          onChange={(v) => setTweak("fontPair", v)} />

        <TweakSection label="Tom do laranja" />
        <TweakColor label="Acento" value={t.orange}
          options={["#E85420", "#FF6D2A", "#C84210", "#FF8A4D"]}
          onChange={(v) => setTweak("orange", v)} />

        <TweakSection label="Interações" />
        <TweakRadio label="Cursor custom" value={t.cursor ? "on" : "off"}
          options={["on", "off"]}
          onChange={(v) => setTweak("cursor", v === "on")} />
        <TweakRadio label="Loader intro" value={t.loader ? "on" : "off"}
          options={["on", "off"]}
          onChange={(v) => setTweak("loader", v === "on")} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
