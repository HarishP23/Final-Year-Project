import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Focused on backend architecture, data modeling, and integrations to make the app fast and reliable.",
      name: "CHIRAG YADAV",
      designation: "Backend & Systems",
      src: "/team/chirag.jpg",
    },
    {
      quote:
        "Leads UI/UX and component development, crafting clean, responsive, and accessible interfaces.",
      name: "HARISH PANDEY",
      designation: "Frontend & UX",
      src: "/team/harish.jpg",
    },
    {
      quote:
        "Works on AI prompts, roadmap logic, and feature flows to deliver personalized learning.",
      name: "MAYANK SHARMA",
      designation: "AI & Product Flow",
      src: "/team/mayank.jpg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
} 