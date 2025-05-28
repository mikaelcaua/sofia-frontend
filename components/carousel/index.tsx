'use client'
import { useState } from 'react'
import Image from 'next/image'

interface CarouselItem {
  id: number
  imageUrl: string
  alt: string
}

interface CarouselProps {
  items?: CarouselItem[]
}

export function ImageCarousel({ items }: CarouselProps) {
  const defaultItems: CarouselItem[] = [
    {
      id: 1,
      imageUrl: '/images/auth/sofia_advertisement.png',
      alt: 'Anúncio Sofia App'
    },
    {
      id: 2,
      imageUrl: '/images/auth/sofia_advertisement.png',
      alt: 'Anúncio Sofia App'
    },
  ]

  const carouselItems = items || defaultItems;
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1))
  }

  const next = () => {
    setCurrent((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="w-full max-h-[50rem] flex items-center justify-center rounded-lg overflow-hidden">
        <Image unoptimized
          src={carouselItems[current].imageUrl}
          width={500}
          height={700}
          alt={carouselItems[current].alt}
          className="object-contain max-h-full max-w-full"
        />
      </div>

      <div className="flex items-center justify-center mt-6 gap-6">
        <button
          onClick={prev}
          className="flex items-center justify-center w-10 h-10 rounded-full text-[#1351B4] hover:text-[#1351B4] transition-all duration-200"
          aria-label="Página anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${current === index
                ? 'bg-blue-600 scale-110'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center justify-center w-10 h-10 rounded-full text-[#1351B4] hover:text-[#1351B4] transition-all duration-200"
          aria-label="Próxima página"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}