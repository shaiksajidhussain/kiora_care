export type ResourceArticle = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
};

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "infections-and-ckd",
    title: "Infections and CKD",
    date: "12 Nov 2025",
    image: "/images/resources-infections.png",
    excerpt: "Understand how seasonal infections impact chronic kidney disease and practical prevention tips.",
  },
  {
    slug: "caring-for-your-mind-during-the-festive-season",
    title: "Caring for Your Mind During the Festive Season",
    date: "23 Oct 2025",
    image: "/images/resources-festiveseason.png",
    excerpt: "Mindfulness ideas to help you stay balanced while celebrating festivals with CKD.",
  },
  {
    slug: "managing-stress-for-better-renal-health",
    title: "Managing Stress for Better Renal Health",
    date: "13 Sep 2025",
    image: "/images/resources-managingstress.png",
    excerpt: "Build a protective routine by pairing stress reduction with regular renal check-ins.",
  },
  {
    slug: "easy-exercise-for-ckd",
    title: "Easy Exercise for CKD: Getting Started Safely",
    date: "25 Nov 2025",
    image: "/images/resources-easyexercise.png",
    excerpt: "Simple movement routines curated with nephrologists to get you moving confidently.",
  },
  {
    slug: "living-with-ckd-guide",
    title: "Living with CKD: Your Guide to a Healthier Daily Routine",
    date: "25 Nov 2025",
    image: "/images/resources-livingwithckd.png",
    excerpt: "Turn everyday choices into kidney-friendly wins with this quick-start guide.",
  },
  {
    slug: "protecting-your-kidneys",
    title: "Protecting Your Kidneys: Simple Steps for Better Health",
    date: "25 Nov 2025",
    image: "/images/resources-protectkidneys.png",
    excerpt: "Actionable, bite-sized habits to keep CKD progression in check.",
  },
];

