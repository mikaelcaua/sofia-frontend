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

export default function ImageCarousel({ items }: CarouselProps) {
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
    <div className="w-full max-w-6xl">
      <div className="relative overflow-hidden h-[500px]">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="min-w-full h-full flex items-center justify-center">
              <Image 
                src={item.imageUrl} 
                width={500} 
                height={700} 
                alt={item.alt}
                className="object-contain max-h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={prev}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          aria-label="Página anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${current === index
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          aria-label="Próxima página"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}