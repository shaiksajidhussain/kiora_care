import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScheduleCallForm from '@/components/ScheduleCallForm';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const TYPEWRITER_SPEED_MS = 50;

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
        <span className="ml-0.5 inline-block h-[0.9em] w-0.5 translate-y-0.5 align-middle bg-foreground animate-pulse" aria-hidden />
      )}
    </span>
  );
}

const TEST_CATEGORIES = [
  {
    title: 'Vital Foundations',
    checks: [
      'Cardiovascular Pressure Mapping',
      'Metabolic Glucose Screening',
      'Resting Heart Rate Variability',
      'Systemic Circulation Baseline',
    ],
    explanation:
      "Think of your body like a car engine. High blood pressure and sugar levels are like running the engine too hard—they put extra stress on your kidneys. These tests check your 'engine' to make sure everything is running smoothly and not putting unnecessary pressure on your kidneys.",
  },
  {
    title: 'Body Architecture',
    checks: [
      'Lean Muscle Mass Density',
      'Adipose (Fat) Tissue Distribution',
      'Precision BMI & Growth Metrics',
      'Skeletal Load Capacity',
    ],
    explanation:
      "Your body's structure tells us a lot about your health. Changes in muscle mass and how your body stores fat can be early warning signs that something might be off with your nutrition or metabolism—common issues in kidney conditions. We track how your body stores and uses energy to catch problems early.",
  },
  {
    title: 'Functional Vitality',
    checks: [
      'Neuromuscular Grip Resilience',
      'Dynamic Gait & Mobility Speed',
      'Physical Autonomy Benchmarks',
      'Age-Relative Strength Scoring',
    ],
    explanation:
      "How strong and mobile you are is a powerful indicator of your overall health. Think of it as a 'health scorecard'—if you can move well, grip things firmly, and stay active, it often means your body systems (including your kidneys) are working better. Strong physical function usually means better long-term kidney health.",
  },
  {
    title: 'Fluid & Tissue Health',
    checks: [
      'Peripheral Fluid Retention Check',
      'Mid-Arm Protein Reserve Analysis',
      'Subcutaneous Tissue Integrity',
      'Localized Oedema Screening',
    ],
    explanation:
      "Your kidneys are like your body's water filter. When they're not working well, your body might hold onto too much water (like swollen ankles or puffy hands). We check for these signs and measure your body's protein stores—both tell us how well your kidneys are managing your body's fluid balance.",
  },
];

const ScheduleTestInfo = () => {
  const navigate = useNavigate();
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);

  return (
    <>
      <div className="bg-background flex flex-col min-h-screen w-full">
        <Header />
        
        <main className="w-full flex flex-col items-center px-4 md:px-6 lg:px-8 pt-24 md:pt-28 pb-8 md:pb-12 max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="self-start flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>

          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              <TypewriterTitle text="What's Included in Your Test?" />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our comprehensive health assessment checks four key areas to give you a complete picture of your kidney health and overall wellness.
            </p>
          </div>

          {/* Test Categories Table */}
          <div className="w-full overflow-x-auto mb-12 flex justify-center">
            <TooltipProvider>
              <table className="border-collapse w-full max-w-lg">
                <thead>
                  <tr>
                    <th className="border-[0.5px] border-border px-2 py-3 text-left text-sm font-semibold text-foreground w-8 bg-background">
                      #
                    </th>
                    <th className="border-[0.5px] border-border px-3 py-3 text-left text-sm font-semibold text-foreground bg-background whitespace-nowrap">
                    Focus area
                    </th>
                    <th className="border-[0.5px] border-border px-3 py-3 text-left text-sm font-semibold text-foreground bg-background">
                    Indicators tracked
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TEST_CATEGORIES.map((category, index) => (
                    <tr
                      key={index}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="border-[0.5px] border-border px-2 py-4 text-sm font-medium text-foreground text-center bg-background w-8">
                        {index + 1}
                      </td>
                      <td className="border-[0.5px] border-border px-3 py-4 bg-background whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-foreground">
                            {category.title}
                          </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full hover:bg-accent p-0.5 transition-colors flex-shrink-0"
                                aria-label="More information"
                              >
                                <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="max-w-sm p-4 text-sm leading-relaxed"
                            >
                              <p className="whitespace-normal">{category.explanation}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="border-[0.5px] border-border px-3 py-4 bg-background">
                        <ul className="space-y-1">
                          {category.checks.map((check, checkIndex) => (
                            <li key={checkIndex} className="text-sm text-foreground/90 leading-relaxed">
                              <span className="text-foreground mr-1.5">•</span>
                              {check}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TooltipProvider>
          </div>

          {/* Pricing & CTA */}
          <div className="w-full bg-gradient-to-br from-card via-card to-primary/5 border border-border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl text-center">
            <div className="mb-6">
              <p className="text-sm md:text-base text-muted-foreground mb-2 font-medium">Special Offer</p>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-xl md:text-2xl text-muted-foreground line-through">₹1,299</span>
                <span className="text-3xl md:text-4xl font-bold text-foreground">₹999</span>
                <span className="text-base md:text-lg text-muted-foreground">per test</span>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Get a complete health assessment with expert analysis and personalized recommendations—all for just ₹999.
            </p>
            <Button
              onClick={() => setScheduleFormOpen(true)}
              className="w-full md:w-auto min-w-[220px] h-12 md:h-14 text-base md:text-lg font-semibold rounded-xl bg-primary hover:opacity-90 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Schedule My Test
            </Button>
          </div>
        </main>

        <Footer />
      </div>
      <ScheduleCallForm open={scheduleFormOpen} onOpenChange={setScheduleFormOpen} />
    </>
  );
};

export default ScheduleTestInfo;
