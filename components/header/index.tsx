import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row md:items-center p-2 shadow-md w-full">
      <div className="flex-shrink-0">
        <Image
          src="/images/logos/sofia_logo.svg"
          alt="Logo Sofia"
          width={80}
          height={80}
          priority
        />
      </div>

      <div className="flex flex-col w-full md:ml-4 mt-2 md:mt-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-xl md:text-2xl">SOFIA</h1>

          <div className="flex flex-col md:flex-row md:items-center md:pr-10 md:gap-10 mt-2 md:mt-0">
            <nav className="hidden md:flex text-sm gap-4 md:pr-16">
              <Link
                href="#"
                className="text-secondary_blue hover:text-blue-600 transition-colors duration-200"
              >
                Link 1
              </Link>
              <Link
                href="#"
                className="text-secondary_blue hover:text-blue-600 transition-colors duration-200"
              >
                Link 2
              </Link>
              <Link
                href="#"
                className="text-secondary_blue hover:text-blue-600 transition-colors duration-200"
              >
                Link 3
              </Link>
              <Link
                href="#"
                className="text-secondary_blue hover:text-blue-600 transition-colors duration-200"
              >
                Link 4
              </Link>
            </nav>

            <ul className="hidden md:flex gap-4">
              <Image
                src="/images/icons/phone_icon.svg"
                alt="Ícone Telefone"
                width={28}
                height={28}
                priority
              />
            </ul>
          </div>
        </div>

        <h1 className="text-base md:text-xl mt-2 md:mt-4">
          Sistema Online de Fortalecimento Interativo para Atenção Primária
        </h1>
      </div>
    </header>
  );
}
