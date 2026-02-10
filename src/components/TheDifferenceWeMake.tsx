import React, { useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0.6 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Parse "15 Cr+", "30x", "40%" into { number, suffix } */
function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseInt(match[1], 10), suffix: match[2] || '' };
}

function CountUp({
  value,
  isVisible,
  className,
}: {
  value: string;
  isVisible: boolean;
  className?: string;
}) {
  const { number, suffix } = parseStatValue(value);
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!isVisible) return;
    const controls = animate(motionValue, number, {
      duration: 1.2,
      ease: easeOutExpo,
    });
    return () => controls.stop();
  }, [isVisible, number, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
}

const stats = [
  {
    number: 1,
    value: '15 Cr+',
    description:
      'Chronic kidney disease patients in India, affecting their lifestyle and long-term health.',
  },
  {
    number: 2,
    value: '30x',
    description:
      'Savings in annual treatment cost for Kiora patients, helping them avoid over ₹4 lacs a year in dialysis costs.',
  },
  {
    number: 3,
    value: '40%',
    description:
      'Slowdown in disease progression through multidisciplinary coordinated care, improving overall health outcomes.',
  },
];

const TheDifferenceWeMake = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });

  const lineGradient =
    'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--foreground) / 0.4) 50%, hsl(var(--background)) 100%)';

  return (
    <motion.section
      ref={sectionRef}
      className="flex flex-col items-center px-4 py-10 md:py-20"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={container}
    >
      <motion.h2
        variants={item}
        className="text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center"
      >
        The Difference We Make
      </motion.h2>
      <motion.p
        variants={item}
        className="text-foreground text-[clamp(18px,2vw,24px)] font-normal leading-relaxed tracking-tight text-center mt-4 max-w-[900px]"
      >
        The Problem. The Impact. The Change.
      </motion.p>

      <div className="w-full max-w-[1200px] mt-8 md:mt-[80px]">
        {/* Desktop: Horizontal layout with connecting lines */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* First connecting line */}
          <motion.div
            variants={lineVariants}
            className="absolute top-[25px] z-0 origin-left"
            style={{
              left: 'calc(16.666% + 25px + 50px)',
              width: 'calc(33.333% - 50px - 100px)',
              height: '1px',
              background: lineGradient,
              borderRadius: '1px',
            }}
          />
          {/* Second connecting line */}
          <motion.div
            variants={lineVariants}
            className="absolute top-[25px] z-0 origin-left"
            style={{
              left: 'calc(50% + 25px + 50px)',
              width: 'calc(33.333% - 50px - 100px)',
              height: '1px',
              background: lineGradient,
              borderRadius: '1px',
            }}
          />

          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center flex-1 relative z-10"
            >
              <motion.div
                className="w-[50px] h-[50px] rounded-[50px] flex items-center justify-center mb-6 cursor-default"
                style={{
                  backgroundColor: '#1190FF',
                  boxShadow:
                    'inset 0px 0px 10px rgba(255,255,255,0.4), 0px 4px 10px rgba(17,144,255,0.35)',
                }}
                whileHover={{
                  scale: 1.12,
                  boxShadow:
                    'inset 0px 0px 12px rgba(255,255,255,0.5), 0px 6px 20px rgba(17,144,255,0.5)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <span className="text-white text-2xl font-bold text-center leading-none flex items-center justify-center">
                  {stat.number}
                </span>
              </motion.div>

              <CountUp
                value={stat.value}
                isVisible={isInView}
                className="text-foreground text-[clamp(36px,4vw,56px)] font-bold leading-tight tracking-tight text-center mb-4 block"
              />

              <motion.p
                variants={item}
                className="text-foreground text-[clamp(16px,1.8vw,20px)] font-normal leading-relaxed tracking-tight text-center max-w-[340px]"
              >
                {stat.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical layout with separator lines */}
        <div className="flex md:hidden flex-col relative">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: easeOutExpo,
                }}
                className="flex flex-col items-center py-6 pb-8 relative"
              >
                <motion.div
                  className="w-[50px] h-[50px] rounded-[50px] flex items-center justify-center mb-6 relative z-10"
                  style={{
                    backgroundColor: '#1190FF',
                    boxShadow:
                      'inset 0px 0px 10px rgba(255,255,255,0.4), 0px 4px 10px rgba(17,144,255,0.35)',
                  }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow:
                      'inset 0px 0px 12px rgba(255,255,255,0.5), 0px 6px 20px rgba(17,144,255,0.5)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <span className="text-white text-2xl font-bold text-center leading-none flex items-center justify-center">
                    {stat.number}
                  </span>
                </motion.div>

                <CountUp
                  value={stat.value}
                  isVisible={isInView}
                  className="text-foreground text-[clamp(36px,8vw,48px)] font-bold leading-tight tracking-tight text-center mb-4 block"
                />

                <p className="text-foreground text-[clamp(16px,4vw,18px)] font-normal leading-relaxed tracking-tight text-center px-4">
                  {stat.description}
                </p>
              </motion.div>

              {index < stats.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0.5 }}
                  animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.15,
                    ease: easeOutExpo,
                  }}
                  className="h-[1px] mx-auto relative z-0 my-4 origin-center"
                  style={{
                    width: 'calc(100% - 100px)',
                    background: lineGradient,
                    borderRadius: '1px',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TheDifferenceWeMake;
