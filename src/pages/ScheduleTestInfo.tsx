import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import ScheduleCallForm from '@/components/ScheduleCallForm';

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
    }, 50);
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
    id: 1,
    category: 'Vital Foundations',
    checks: [
      'Cardiovascular Pressure Mapping',
      'Metabolic Glucose Screening',
      'Resting Heart Rate Variability',
      'Systemic Circulation Baseline',
    ],
    explanation:
      "High blood pressure and sugar levels are primary drivers of kidney stress. We establish your baseline vitals to ensure your 'engine' is running smoothly.",
  },
  {
    id: 2,
    category: 'Body Architecture',
    checks: [
      'Lean Muscle Mass Density',
      'Adipose (Fat) Tissue Distribution',
      'Precision BMI & Growth Metrics',
      'Skeletal Load Capacity',
    ],
    explanation:
      "Changes in muscle mass and fat distribution are early indicators of nutritional shifts often seen in chronic conditions. We track how your body stores and uses energy.",
  },
  {
    id: 3,
    category: 'Functional Vitality',
    checks: [
      'Neuromuscular Grip Resilience',
      'Dynamic Gait & Mobility Speed',
      'Physical Autonomy Benchmarks',
      'Age-Relative Strength Scoring',
    ],
    explanation:
      "We assess your physical resilience, which serves as a powerful 'bio-marker' for overall systemic health. High function often correlates with better long-term kidney outcomes.",
  },
  {
    id: 4,
    category: 'Fluid & Tissue Health',
    checks: [
      'Peripheral Fluid Retention Check',
      'Mid-Arm Protein Reserve Analysis',
      'Subcutaneous Tissue Integrity',
      'Localized Oedema Screening',
    ],
    explanation:
      "By checking for fluid retention and tissue thickness, we identify how efficiently your body is managing fluid balance—a key indicator of renal performance.",
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
              <TypewriterTitle text="What fits you better?" />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our comprehensive health assessment give you a complete picture of your kidney health and overall wellness.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="w-full max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* One Time Test Card */}
              <div className="bg-background rounded-2xl border-2 border-primary/30 shadow-xl p-6 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 relative bg-gradient-to-br from-primary/8 via-background to-primary/5">
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary dark:text-primary">
                    POPULAR
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3 mt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 rounded bg-primary animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">One Time Test</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick and comprehensive health assessment for immediate insights.
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xs text-muted-foreground line-through">₹1,299</span>
                  <span className="text-4xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">₹999</span>
                  <span className="text-sm text-muted-foreground">per test</span>
                </div>
                <Button
                  onClick={() => setScheduleFormOpen(true)}
                  className="w-full mb-6 bg-primary hover:opacity-90 hover:scale-105 hover:shadow-lg text-primary-foreground transition-all duration-200"
                >
                  Schedule Test
                </Button>
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-100">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Comprehensive Health Assessment
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-200">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Expert Analysis & Insights
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-300">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Anthropometric measurements and benchmarks
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-400">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Functional vitality metrics
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-500">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Vitals & Health Metrics Tracking
                    </li>
                  </ul>
                </div>
              </div>

              {/* 90 Days Plan Card */}
              <div className="bg-background rounded-2xl border border-border/50 shadow-lg p-6 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 delay-150 relative bg-gradient-to-br from-purple-500/5 via-background to-background">
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-400">
                    PREMIUM
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3 mt-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 rounded bg-purple-500 animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">90 Days Plan</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive care program with continuous monitoring and support.
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xs text-muted-foreground line-through">₹4,999</span>
                  <span className="text-4xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">₹3,999</span>
                  <span className="text-sm text-muted-foreground">per plan</span>
                </div>
                <Button
                  onClick={() => setScheduleFormOpen(true)}
                  className="w-full mb-6 bg-primary hover:opacity-90 hover:scale-105 hover:shadow-lg text-primary-foreground transition-all duration-200"
                >
                  Schedule Test
                </Button>
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Everything in One Time Test, plus:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-100">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Continuous Monitoring (90 days)
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-150">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Follow-up Consultations
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-200">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Personalized Care Plan Updates
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-250">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Patient Portal Access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-300">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Monthly Twice Test
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-350">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Diet Preference Tracking
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-400">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Medical Preference Management
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-450">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Vitals & Health Metrics Tracking
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300 delay-500">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 hover:scale-110 transition-transform" />
                      Mental Health Support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Comparison Table */}
          <div className="w-full mb-12 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-background animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
                <table className="border-collapse w-full min-w-[600px] table-fixed">
                <thead>
                  <tr>
                    <th className="border-[0.5px] border-border/50 px-3 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground bg-muted/30 w-[50%]">
                      Features
                    </th>
                    <th className="border-2 border-primary/30 px-3 py-3 md:px-6 md:py-4 text-center bg-gradient-to-br from-primary/8 via-muted/20 to-primary/5 relative w-[25%]">
                      <div className="absolute top-1 right-1 md:top-1 md:right-1">
                        <span className="px-1.5 py-0.5 text-[9px] md:text-[10px] font-semibold rounded-full bg-primary/20 text-primary whitespace-nowrap">
                          POPULAR
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 md:gap-1 pt-3 md:pt-3">
                        <span className="text-[10px] md:text-xs font-medium text-foreground">One Time Test</span>
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <span className="text-[9px] md:text-xs text-muted-foreground line-through">₹1,299</span>
                          <span className="text-xl md:text-3xl font-bold text-foreground">₹999</span>
                        </div>
                        <span className="text-[9px] md:text-xs text-muted-foreground">per test</span>
                      </div>
                    </th>
                    <th className="border-[0.5px] border-border/50 px-3 py-3 md:px-6 md:py-4 text-center bg-muted/20 w-[25%]">
                      <div className="flex flex-col items-center gap-0.5 md:gap-1">
                        <span className="text-[10px] md:text-xs font-medium text-muted-foreground">90 Days Plan</span>
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <span className="text-[9px] md:text-xs text-muted-foreground line-through">₹4,999</span>
                          <span className="text-xl md:text-3xl font-bold text-foreground">₹3,999</span>
                        </div>
                        <span className="text-[9px] md:text-xs text-muted-foreground">per plan</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Comprehensive Health Assessment
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] bg-muted/10 animate-in fade-in slide-in-from-bottom-2 delay-75">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-muted/10">
                      Expert Analysis & Insights
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2 delay-100">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Anthropometric measurements and benchmarks
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] bg-muted/10 animate-in fade-in slide-in-from-bottom-2 delay-125">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-muted/10">
                      Functional vitality metrics
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2 delay-150">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Vitals & Health Metrics Tracking
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2 delay-175">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Continuous Monitoring (90 days)
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] bg-muted/10 animate-in fade-in slide-in-from-bottom-2 delay-200">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-muted/10">
                      Follow-up Consultations
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2 delay-300">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Personalized Care Plan Updates
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] bg-muted/10 animate-in fade-in slide-in-from-bottom-2 delay-400">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-muted/10">
                      Patient Portal Provided
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2 delay-500">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Monthly Twice Test
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] bg-muted/10 animate-in fade-in slide-in-from-bottom-2 delay-600">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-muted/10">
                      Diet Preference Tracking
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-muted/10">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2 delay-700">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Medical Preference Management
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/5 transition-all duration-200 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-2 delay-800">
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-xs md:text-sm font-medium text-foreground bg-background">
                      Mental Health Support
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-2.5 md:px-6 md:py-4 text-center bg-background">
                      <div className="flex justify-center">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-border/50 bg-muted/10 animate-in fade-in slide-in-from-bottom-4 delay-1000">
                    <td className="border-[0.5px] border-border/50 px-3 py-3 md:px-6 md:py-4 bg-muted/10" />
                    <td className="border-[0.5px] border-border/50 px-3 py-3 md:px-6 md:py-4 bg-muted/10 align-middle">
                      <div className="flex justify-center items-center">
                        <Button
                          onClick={() => setScheduleFormOpen(true)}
                          className="w-full text-xs md:text-sm bg-primary hover:opacity-90 hover:scale-105 hover:shadow-lg text-primary-foreground transition-all duration-200 py-2.5"
                        >
                          Schedule Test
                        </Button>
                      </div>
                    </td>
                    <td className="border-[0.5px] border-border/50 px-3 py-3 md:px-6 md:py-4 bg-muted/10 align-middle">
                      <div className="flex justify-center items-center">
                        <Button
                          onClick={() => setScheduleFormOpen(true)}
                          className="w-full text-xs md:text-sm bg-primary hover:opacity-90 hover:scale-105 hover:shadow-lg text-primary-foreground transition-all duration-200 py-2.5"
                        >
                          Schedule Test
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              </div>
            </div>
          </div>

          {/* Test Categories Table */}
          {/* Commented out - Feels like a lot of table on one page. Maybe We move this to FAQ section like what are tests and provide the details there */}
          {/* 
          <div className="w-full overflow-x-auto mb-12 flex justify-center">
            <TooltipProvider>
              <table className="border-collapse w-full max-w-lg">
                <thead>
                  <tr>
                    <th className="border-[0.5px] border-border px-2 py-3 text-left text-sm font-semibold text-foreground w-8 bg-background">
                      #
                    </th>
                    <th className="border-[0.5px] border-border px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap bg-background">
                    Focused area
                    </th>
                    <th className="border-[0.5px] border-border px-4 py-3 text-left text-sm font-semibold text-foreground bg-background">
                    Indicators tracked 
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TEST_CATEGORIES.map((category, index) => (
                    <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                      <td className="border-[0.5px] border-border px-2 py-3 text-sm text-muted-foreground bg-background">
                        {category.id}
                      </td>
                      <td className="border-[0.5px] border-border px-4 py-3 text-sm font-medium text-foreground bg-background">
                        <div className="flex items-center gap-2">
                          {category.category}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-muted-foreground hover:text-foreground transition-colors">
                                <Info className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="max-w-sm p-4 text-sm leading-relaxed"
                            >
                              <p>{category.explanation}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="border-[0.5px] border-border px-4 py-3 text-sm text-muted-foreground bg-background">
                        <ul className="list-disc list-inside space-y-1">
                          {category.checks.map((check, checkIndex) => (
                            <li key={checkIndex}>{check}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TooltipProvider>
          </div>
          */}

          {/* FAQ Section */}
          <div className="w-full max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem 
                  value="what-tests"
                  className="rounded-lg border-b-0 border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2 mb-4"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors duration-200 px-4">
                    What tests are included in my health assessment?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">
                      Our comprehensive health assessment includes multiple categories of tests to give you a complete picture of your kidney health and overall wellness:
                    </p>
                    <div className="space-y-4">
                      {TEST_CATEGORIES.map((category, idx) => (
                        <div 
                          key={category.id} 
                          className="border-l-2 border-primary/30 pl-4 rounded-r-lg bg-muted/20 p-3 hover:bg-muted/30 hover:shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-left-2"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <h4 className="font-semibold text-foreground mb-2">{category.category}</h4>
                          <p className="text-sm mb-2">{category.explanation}</p>
                          <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                            {category.checks.map((check, index) => (
                              <li key={index} className="hover:text-foreground transition-colors duration-200">{check}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="what-included-999"
                  className="rounded-lg border-b-0 border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2 delay-75 mb-4"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors duration-200 px-4">
                    What's included in the ₹999 One Time Test plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">
                    <ul className="space-y-2">
                      {[
                        'Comprehensive Health Assessment',
                        'Expert Analysis & Recommendations',
                        'Anthropometric measurements and benchmarks',
                        'Functional vitality metrics',
                        'Vitals & Health Metrics Tracking'
                      ].map((item, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-2 animate-in fade-in slide-in-from-left-2 hover:text-foreground transition-all duration-200 hover:translate-x-1"
                          style={{ animationDelay: `${index * 75}ms` }}
                        >
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 hover:scale-110 transition-transform duration-200" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="what-included-2999"
                  className="rounded-lg border-b-0 border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2 delay-150 mb-4"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors duration-200 px-4">
                    What's included in the ₹2999 90 Days Plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">
                    <p className="mb-4 animate-in fade-in slide-in-from-bottom-2">
                      The 90 Days Plan includes everything in the One Time Test, plus:
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Continuous Monitoring (90 days)',
                        'Follow-up Consultations',
                        'Personalized Care Plan Updates',
                        'Patient Portal Access',
                        'Monthly Twice Test',
                        'Diet Preference Tracking',
                        'Medical Preference Management',
                        'Vitals & Health Metrics Tracking',
                        'Mental Health Support'
                      ].map((item, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-2 animate-in fade-in slide-in-from-left-2 hover:text-foreground transition-all duration-200 hover:translate-x-1"
                          style={{ animationDelay: `${index * 75}ms` }}
                        >
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 hover:scale-110 transition-transform duration-200" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="how-long"
                  className="rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2 delay-200"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors duration-200 px-4">
                    How long does it take to get results?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">
                    <p className="animate-in fade-in slide-in-from-bottom-2">
                      Results from your comprehensive health assessment are typically available within 3-5 business days. For the 90 Days Plan, you'll receive regular updates and monitoring reports throughout your care period.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="how-schedule"
                  className="rounded-lg border-b-0 border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2 delay-300 mb-4"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors duration-200 px-4">
                    How do I schedule a test?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">
                    <p className="animate-in fade-in slide-in-from-bottom-2">
                      Simply click the "Schedule Test" button on your preferred plan (One Time Test or 90 Days Plan), fill out the form with your details and preferred date & time, and we'll get back to you shortly with a confirmation.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="what-vitals"
                  className="rounded-lg border-b-0 border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2 delay-400 mb-4"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors duration-200 px-4">
                    What are Vitals & Health Metrics Tracking?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">
                    <p className="mb-4 animate-in fade-in slide-in-from-bottom-2">
                      Vitals & Health Metrics Tracking includes monitoring of:
                    </p>
                    <ul className="space-y-2 list-disc list-inside">
                      {[
                        'Vital Foundations: Cardiovascular pressure, glucose levels, heart rate variability, and circulation baseline',
                        'Body Architecture: Muscle mass, fat distribution, BMI, and skeletal health',
                        'Functional Vitality: Grip strength, mobility, physical autonomy, and age-relative strength',
                        'Fluid & Tissue Health: Fluid retention, protein reserves, tissue integrity, and edema screening'
                      ].map((item, index) => (
                        <li 
                          key={index}
                          className="animate-in fade-in slide-in-from-left-2 hover:text-foreground transition-colors duration-200"
                          style={{ animationDelay: `${index * 75}ms` }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </main>
      </div>

      <ScheduleCallForm open={scheduleFormOpen} onOpenChange={setScheduleFormOpen} />
    </>
  );
};

export default ScheduleTestInfo;
