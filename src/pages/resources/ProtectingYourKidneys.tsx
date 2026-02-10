import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OtherArticlesMarquee from "@/components/OtherArticlesMarquee";

const ProtectingYourKidneys = () => {
  const slug = "protecting-your-kidneys";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col gap-12 py-16 mt-[50px]">
        <section className="mx-auto w-full max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Resources</p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">Protecting Your Kidneys: Simple Steps for Better Health</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Final copy about prevention, early detection, or everyday wins will go here when you design this page.
          </p>
        </section>

        <section className="mx-auto w-full max-w-4xl rounded-3xl bg-card p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/50 text-center text-sm text-muted-foreground">
            Blog module placeholder. Replace with your detailed content, stats, or CTA blocks.
          </div>
        </section>

        <OtherArticlesMarquee currentSlug={slug} />
      </main>

      <Footer />
    </div>
  );
};

export default ProtectingYourKidneys;

