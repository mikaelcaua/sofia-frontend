import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-footer_blue flex flex-col items-center gap-4 p-4 md:flex-row md:justify-around">
      <Image
        src="/images/logos/telessaude_ma_logo.svg"
        alt="Logo Telessaúde MA"
        width={150}
        height={150}
        priority
      />

      <Image src="/images/logos/sted_logo.svg" alt="Logo STED" width={150} height={150} priority />

      <Image
        src="/images/logos/telessaude_logo.svg"
        alt="Logo Telessaúde"
        width={150}
        height={150}
        priority
      />

      <Image
        src="/images/logos/sus_ministerio_gov_logo.svg"
        alt="Logo SUS Ministério"
        width={150}
        height={150}
        priority
      />
    </footer>
  );
}
