import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/icons/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon className="fill-yellow-500" />,
    title: "Garantía de calidad",
    description:
      "Te garantizamos que nuestros inmuebles cumplen con los más altos estandares",
  },
  {
    icon: <MapIcon className="fill-destructive" />,
    title: "Asesoría personalizada",
    description: "Te ayudamos a encontrar el inmueble que mejor se adapte a ti",
  },
  {
    icon: <PlaneIcon className="fill-emerald-800" />,
    title: "En todo el mundo",
    description:
      "Encuentra tu edificio, departamento o lo que necesites en cualquier parte del mundo",
  },
  {
    icon: <GiftIcon className="fill-sky-600" />,
    title: "Financiamiento flexible",
    description:
      "Te ofrecemos facilidades de pago para que puedas comprar tu inmueble",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-16">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
