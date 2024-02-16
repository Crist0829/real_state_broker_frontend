import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button, buttonVariants } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { useAuthenticate } from "@/store/useAuthenticate";
import Logo from "../home/Logo";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/register",
    label: "Registrarse",
  },
  {
    href: "/login",
    label: "Iniciar sesión",
  },
  {
    href: "/",
    label: "Home",
  },
];

const routeListAuth: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
];

const links = {
  auth: routeListAuth,
  comun: routeList,
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isAuthenticated, logout } = useAuthenticate();

  return (
    <header className="sticky top-0 z-40 w-full py-3 " id="header-nav">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link to="/" className="ml-2 font-bold  text-xl flex">
              <Logo />
            </Link>
          </NavigationMenuItem>

          {/* desktop */}
          <nav className="hidden md:flex  flex-grow   justify-end gap-2">
            {links[isAuthenticated ? "auth" : "comun"].map(
              (route: RouteProps, i) => (
                <Link
                  to={route.href}
                  key={i}
                  className={`text-[17px] ${buttonVariants({
                    variant: "ghost",
                  })}`}
                >
                  {route.label}
                </Link>
              )
            )}
          </nav>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                ></Menu>
              </SheetTrigger>

              <SheetContent className="flex flex-col" side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl flex justify-center">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col  items-center gap-2 mt-4 flex-grow  flex-shrink-0">
                  {links[isAuthenticated ? "auth" : "comun"].map(
                    ({ href, label }: RouteProps) => (
                      <Link
                        key={label}
                        to={href}
                        onClick={() => setIsOpen(false)}
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        {label}
                      </Link>
                    )
                  )}
                </nav>
                {isAuthenticated && (
                  <Button
                    onClick={logout}
                    className={`p-2 animate-fade-in w-8/12 mx-auto  flex gap-5 flex-shrink`}
                    variant="outline"
                  >
                    {" "}
                    Cerrar sesión
                    <LogOut />{" "}
                  </Button>
                )}
              </SheetContent>
            </Sheet>
          </span>

          <div className="hidden md:flex gap-2   justify-end">
            <ModeToggle />
            {isAuthenticated && (
              <Button
                onClick={logout}
                className={`p-2 animate-fade-in`}
                variant="outline"
              >
                {" "}
                <LogOut />{" "}
              </Button>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
