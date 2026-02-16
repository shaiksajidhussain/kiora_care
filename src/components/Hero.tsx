import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import ScheduleCallForm from '@/components/ScheduleCallForm';
import onePlatformImage from '../images/oneplatform.jpeg';
import preventImage from '../images/prevent.jpeg';
import lifeisbeautiful from '../images/lifeisbeautiful.jpg';
import personalizedcare from '../images/personalizedcare.jpg';

const TYPEWRITER_SPEED_MS = 55;

function TypewriterTitle({ text }: { text: string }) {
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    setDisplayedLength(0);
    if (!text) return;
    const id = setInterval(() => {
      setDisplayedLength((prev) => {
        if (prev >= text.length) {
          clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, TYPEWRITER_SPEED_MS);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span className="inline">
      {text.slice(0, displayedLength)}
      {displayedLength < text.length && (
        <span className="ml-0.5 inline-block h-[0.9em] w-0.5 translate-y-0.5 align-middle bg-white animate-hero-cursor" aria-hidden />
      )}
    </span>
  );
}

const SLIDES = [
  {
    title: 'Life is Beautiful.',
    subtitle: 'Even for those with kidney conditions.',
    description:
      "India's first comprehensive renal care solution. Talk to our team to see how we can help you prevent dialysis and restore life.",
    image:
    lifeisbeautiful,
  },
  {
    title: 'Personalized care.',
    subtitle: 'Built around you.',
    description:
      'Evidence-based plans, continuous monitoring, and a care team that understands your journey. ',
    image:
      personalizedcare,
  },
  {
    title: 'Prevent. Restore. Thrive.',
    subtitle: 'Beyond dialysis.',
    description:
      'Early intervention, lifestyle support, and technology that helps you stay ahead of kidney disease. ',
    image: preventImage,
  },
  {
    title: 'Your health, simplified.',
    subtitle: 'One platform. One team.',
    description:
      'From diagnosis to daily management—integrated care that fits your life. ',
    image: onePlatformImage,
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap());
    carouselApi.on('select', onSelect);
    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  return (
    <>
      <section className="relative w-full overflow-hidden rounded-[25px]">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {SLIDES.map((slide, index) => (
              <CarouselItem key={index} className="pl-0">
                <div
                  className="relative flex min-h-[100vh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 pb-16 pt-20 text-center md:pb-32 md:pt-[156px]"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.5)), url("${slide.image}")`,
                  }}
                >
                  <div className="relative z-10 max-w-[1200px] transition-transform duration-300 ease-out hover:translate-y-[-2px]">
                    <h1 className="font-normal text-white">
                      <span
                        className={`block text-[clamp(48px,8vw,128px)] leading-[1.1] tracking-tight transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                        style={{ transitionDelay: '0ms' }}
                      >
                        {index === selectedIndex ? (
                          <TypewriterTitle key={selectedIndex} text={slide.title} />
                        ) : (
                          slide.title
                        )}
                      </span>
                      <span
                        className={`mt-4 block text-[clamp(32px,5vw,64px)] leading-[1.2] tracking-tight transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                        style={{ transitionDelay: '150ms' }}
                      >
                        {slide.subtitle}
                      </span>
                    </h1>
                    <p
                      className={`mt-[18px] max-w-[1042px] px-4 text-[clamp(16px,2vw,20px)] leading-[1.2] tracking-tight text-white/95 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                      style={{ transitionDelay: '300ms' }}
                    >
                      {slide.description}
                    </p>
                    <p
                      className={`mt-10 text-[clamp(15px,1.8vw,18px)] text-white/90 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                      style={{ transitionDelay: '400ms' }}
                    >
                      Book a time that works for you—we’ll reach out to confirm.
                    </p>
                    <div
                      className={`mt-6 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                      style={{ transitionDelay: '500ms' }}
                    >
                      <button
                        onClick={() => navigate('/schedule-test')}
                        className="bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] text-primary-foreground rounded-xl px-9 py-2.5 transition-all duration-300 ease-out hover:scale-105 hover:opacity-90 hover:shadow-[0px_6px_28px_rgba(17,144,255,0.45)] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                      >
                        Schedule a test
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4 h-10 w-10 rounded-full border-2 bg-background/90 shadow-md transition-transform duration-300 ease-out hover:scale-110 hover:shadow-lg" />
          <CarouselNext className="right-2 md:right-4 h-10 w-10 rounded-full border-2 bg-background/90 shadow-md transition-transform duration-300 ease-out hover:scale-110 hover:shadow-lg" />
        </Carousel>
      </section>
      <ScheduleCallForm open={scheduleFormOpen} onOpenChange={setScheduleFormOpen} />
    </>
  );
};

export default Hero;
