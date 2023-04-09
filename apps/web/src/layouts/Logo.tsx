import Image from "next/image";
import logo from "src/assets/logo.png";

export const Logo = ({ withText }: { withText?: boolean }) => (
  <div className="flex items-center space-x-3  sm:px-4">
    <Image src={logo} width={36} height={36} alt="logo" />
    {withText && (
      <span className="text-2xl font-extrabold text-primary">Jospar.AI</span>
    )}
  </div>
);
