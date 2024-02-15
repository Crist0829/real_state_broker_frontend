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

import { Button, buttonVariants } from "./ui/button";
import { LogOut, Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { useAuthenticate } from "@/store/useAuthenticate";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  /* {
    href: "/register",
    label: "Registrarse",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  }, */
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isAuthenticated, logout } = useAuthenticate();

  return (
    <header className="sticky top-0 z-40 w-full py-3 " id="header-nav">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link to="/" className="ml-2 font-bold text-xl flex">
              Súper Inmobiliaria⚰
            </Link>
          </NavigationMenuItem>

          {/* desktop */}
          <nav className="hidden md:flex  flex-grow   justify-center gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                to={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
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

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    {/*  <Link to="/" className="ml-2 font-bold text-center">
                      Súper Inmobiliaria🏘
                    </Link> */}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
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
