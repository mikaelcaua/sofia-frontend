import Image from "next/image"
export default function Footer() {
    return <footer className="bg-footer-blue flex justify-around pt-1 pb-1">

        <Image
            src="/images/logos/telessaude_ma_logo.svg"
            alt="Logo Sofia"
            width={250}
            height={250}
            priority
        />

        <Image
            src="/images/logos/sted_logo.svg"
            alt="Logo Sofia"
            width={250}
            height={250}
            priority
        />

        <Image
            src="/images/logos/telessaude_logo.svg"
            alt="Logo Sofia"
            width={250}
            height={250}
            priority
        />

        <Image
            src="/images/logos/sus_ministerio_gov_logo.svg"
            alt="Logo Sofia"
            width={250}
            height={250}
            priority
        />
    </footer>
}