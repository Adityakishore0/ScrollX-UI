"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CarouselImageDemo() {
  const images = [
    "https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1687795975521-825a47419cc8?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
  ];

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="p-0">
                  <img
                    src={imageUrl}
                    alt={`Landscape image ${index + 1}`}
                    className="object-cover w-full h-64 rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
