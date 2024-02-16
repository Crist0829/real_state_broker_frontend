import { Home, LayoutDashboard, LogOut, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { useAuthenticate } from "@/store/useAuthenticate";
import { ModeToggle } from "../main/mode-toggle";

function Sidebar() {
  const user = useAuthenticate((state) => state.user);
  const logout = useAuthenticate((state) => state.logout);

  return (
    <aside
      className="flex 
      fixed 
    bottom-0 w-full
    md:min-h-screen md:left-0 md:flex-col md:w-auto  md:px-auto shadow-xl z-10"
    >
      <div className="inline-flex size-20  items-center justify-center">
        <span className="grid  size-10 place-content-center rounded-lg bg-gray-100 text-xl font-extrabold text-gray-600">
          {user?.name[0]}
        </span>
      </div>

      <div className="md:border-t border-gray-100 flex justify-between w-full">
        <nav className="px-2 w-full">
          <ul
            className="space-y-1  border-gray-100 pt-4
           flex  items-center justify-around flex-grow md:gap-3
           md:flex-col
           "
          >
            <li>
              <Link
                to="/properties/create"
                className={`${buttonVariants({
                  variant: "ghost",
                })} group relative`}
              >
                <Plus />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Añadir
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={`${buttonVariants({
                  variant: "ghost",
                })} group relative`}
              >
                <LayoutDashboard />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Inmuebles
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/#all-properties"
                className={`${buttonVariants({
                  variant: "ghost",
                })} group relative`}
              >
                <Home />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Ver inmuebles
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="md:absolute flex md:flex-col items-center gap-3 inset-x-0  border-t p-2
      md:bottom-0
      "
      >
        <span className="hidden md:inline-block">
          <ModeToggle />
        </span>
        <Button
          onClick={() => {
            logout();
          }}
          className="p-3"
        >
          <LogOut width={15} />
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
