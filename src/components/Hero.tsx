import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="pt-8 animate-fade-in-down">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
          Encuentra tu hogar
          <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
            perfecto
          </span>
        </h2>
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
            Administar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
