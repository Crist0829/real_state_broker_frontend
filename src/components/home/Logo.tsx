import { logo, logo_blue } from "../constants/logos";
function Logo() {
  return (
    <>
      <img src={logo} className="dark:hidden w-24" alt="Logo " />
      <img src={logo_blue} className="hidden dark:flex w-24" alt="Logo " />
    </>
  );
}

export default Logo;
