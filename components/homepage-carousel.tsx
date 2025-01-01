import * as React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image, { StaticImageData } from "next/image";
import mexicoBeach from '@/components/homepage-images/mexico_beach.jpg';
import mexicoBeach2 from '@/components/homepage-images/mexico_beach_2.jpg';
import matchingCars from '@/components/homepage-images/matching_cars.jpg';
import spaceNeedleMoon from '@/components/homepage-images/space_needle_moon.jpg';
import rotundoWedding from '@/components/homepage-images/rotundo_wedding.jpg';
import lilyGraduation from '@/components/homepage-images/lilys_graduation.jpg';

type Slide = {
  title: string;
  description: string;
  date: string;
  src: StaticImageData;
};

const SLIDES: Slide[] = [
  {
    title: "Holidays in Florida",
    description: "Visited my dad's beach house in Florida for the holidays",
    date: "2024-12-29",
    src: mexicoBeach,
  },
  {
    title: "Holidays in Florida (continued!)",
    description: "Visited my dad's beach house in Florida for the holidays",
    date: "2024-12-29",
    src: mexicoBeach2,
  },
  {
    title: "Matching Hondas",
    description: "My little sister and I got matching Honda hybrids",
    date: "2024-11-29",
    src: matchingCars
  },
  {
    title: "Space Needle View",
    description: "Caught a cool view of the Space Needle from my apartment",
    date: "2024-11-15",
    src: spaceNeedleMoon,
  },
  {
    title: "Summer Wedding",
    description: "All the friends got together for one of our weddings",
    date: "2024-08-17",
    src: rotundoWedding
  },
  {
    title: "Sister's Graduation",
    description: "Visited my little sister who graduated from Gonzaga University",
    date: "2024-05-12",
    src: lilyGraduation,
  }
]

export function HomepageCarousel() {
    return (
      <div className="w-full max-w-xs">
        <Carousel>
          <CarouselContent>
            {SLIDES.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>{slide.title}</CardTitle>
                      <CardDescription>{slide.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-0 pb-3">
                    <Image src={slide.src} width={500} height={500} alt={slide.title} placeholder="blur" />
                    </CardContent>
                    <CardFooter>
                      <p className="_text-xs _text-gray-500">{slide.date}</p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-center space-x-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    )
  }
  