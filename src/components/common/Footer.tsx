import logoMe from "@/assets/logo-crist.png";
function Footer() {
  return (
    <footer className="p-5 lg:px-8 xl:px-16    flex justify-between items-center 
    bg-gradient-to-b from-transparent  dark:to-zinc-800
    to-[rgba(0,163,255,0.13)]
    ">
      <span className="text-xs lg:text-base flex items-center">
        {" "}
        Creado por{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/cristian-jim%C3%A9nez-72651322a/"
        >
          <img className="w-20" src={logoMe} alt="♟" />
        </a>{" "}
      </span>{" "}
      <span className="text-xs lg:text-base">Prueba técnica | RM DREAMS</span>
    </footer>
  );
}

export default Footer;
