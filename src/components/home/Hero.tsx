import { buttonVariants } from "@/components/ui/button";
import { useAuthenticate } from "@/store/useAuthenticate";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  const isAuthnticated = useAuthenticate((state) => state.isAuthenticated);

  return (
    <div className="pt-8 animate-fade-in-down">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <div className="bg-gradient-to-r from-black to-gray-500 text-transparent bg-clip-text">
          <h2 className="text-center text-3xl font-medium  dark:text-gray-50 sm:text-6xl">
            RM DREAMS - TU HOGAR PERFECTO
          </h2>
        </div>

        <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
          Explora una amplia gama de propiedades en cualquier lugar del mundo
          con <span className="cursor-wait opacity-70">nosotros</span> Desde
          apartamentos urbanos hasta casas rurales, ¡tenemos todo para ti!
        </p>
        <div className="mt-10 flex gap-4">
          <a href="#all-properties" className={buttonVariants()}>
            Ver inmuebles
            <ArrowRight width={18} />
          </a>
          <Link
            to="/login"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            {isAuthnticated ? "Administar" : "Iniciar Sesión"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
