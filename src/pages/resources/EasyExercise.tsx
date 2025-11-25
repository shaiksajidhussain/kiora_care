import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OtherArticlesMarquee from "@/components/OtherArticlesMarquee";

const EasyExercise = () => {
  const slug = "easy-exercise-for-ckd";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1 flex-col gap-12 py-16 mt-[50px]">
        <section className="mx-auto w-full max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Resources</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#0f172a]">Easy Exercise for CKD: Getting Started Safely</h1>
          <p className="mt-4 text-lg text-[#475467]">
            This hero section is ready for your exercise primer intro, movement guidelines, or patient stories.
          </p>
        </section>

        <section className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d0d5dd] bg-[#f8fbff] text-center text-sm text-[#98a2b3]">
            Blog content placeholder. Add your custom modules (videos, movement cards, etc.) here.
          </div>
        </section>

        <OtherArticlesMarquee currentSlug={slug} />
      </main>

      <Footer />
    </div>
  );
};

export default EasyExercise;

