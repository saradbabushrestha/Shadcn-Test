import { CardWithForm } from "@/layout/miniform";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/toggle-theme/mode-toggle";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <CardWithForm />
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
};

export default App;
