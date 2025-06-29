
import { useState } from "react";
import { useTheme } from "../theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Sun, Moon, Car } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DocLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Overview", href: "/", icon: Car },
  { name: "Quick Start", href: "/quickstart" },
  { name: "Authentication", href: "/authentication" },
  { name: "API Reference", href: "/api-reference" },
  { name: "API Explorer", href: "/api-explorer" },
  { name: "Webhooks", href: "/webhooks" },
  { name: "SDKs", href: "/sdks" },
  { name: "Best Practices", href: "/best-practices" },
  { name: "API Status", href: "/api-status" },
  { name: "Changelog", href: "/changelog" },
  { name: "Support", href: "/support" },
];

export function DocLayout({ children }: DocLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const Sidebar = () => (
    <div className="flex h-full w-64 flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-lg">Stellantis CV API</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                  location.pathname === item.href && "bg-muted text-primary font-semibold"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Car className="h-6 w-6 text-blue-600" />
              <span className="hidden font-bold sm:inline-block">Stellantis Connected Vehicles API</span>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="pl-8 md:w-[300px] lg:w-[400px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="container max-w-4xl py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
