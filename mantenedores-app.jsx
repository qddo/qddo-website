/* global React, ReactDOM, ScrollEngine, CustomCursor, Loader, TopBar, DropMenu,
   MHero, MValue, MWays, MProcess, MResults, MContact, VFooter */

function MaintainersApp() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <>
      <Loader />
      <CustomCursor />
      <ScrollEngine />
      <TopBar menuOpen={menuOpen} onMenuToggle={setMenuOpen} />
      <DropMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <MHero />
        <MValue />
        <MWays />
        <MProcess />
        <MResults />
        <MContact />
      </main>
      <VFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MaintainersApp />);
