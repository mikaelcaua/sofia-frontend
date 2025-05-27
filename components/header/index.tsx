import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center p-4 shadow-md">
            <div className="flex-shrink-0">
                <Image
                    src="/images/logos/sofia_logo.svg"
                    alt="Logo Sofia"
                    width={100}
                    height={100}
                    priority
                />
            </div>

            <div className="flex flex-col w-full ml-4 gap-1">
                <div className="flex justify-between items-center">
                    <h1 className="text-[2rem]">SOFIA</h1>

                    <div className="flex items-center pr-10 gap-10">
                        <nav className="flex gap-4 pr-16">
                            <Link href="#" className="text-secondary-blue hover:text-blue-600 transition-colors duration-200">
                                Link de acesso 1
                            </Link>
                            <Link href="#" className="text-secondary-blue hover:text-blue-600 transition-colors duration-200">
                                Link de acesso 2
                            </Link>
                            <Link href="#" className="text-secondary-blue hover:text-blue-600 transition-colors duration-200">
                                Link de acesso 3
                            </Link>
                            <Link href="#" className="text-secondary-blue hover:text-blue-600 transition-colors duration-200">
                                Link de acesso 4
                            </Link>
                        </nav>

                        <ul className="flex gap-4">
                            <Image
                                src="/images/icons/phone_icon.svg"
                                alt="Logo Sofia"
                                width={32}
                                height={32}
                                priority
                            />
                        </ul>
                    </div>
                </div>

                <h1 className="text-[2rem] ">Sistema Online de Fortalecimento Interativo para Atenção Primária</h1>

            </div>
        </header>
    );
}