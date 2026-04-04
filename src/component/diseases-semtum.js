import Link from "next/link";
import Image from "next/image";
import {
  Heart, Activity, Brain, Wind,
  Scale, Droplets, Bone, ShieldCheck
} from "lucide-react";

const diseases = [
  {
    title: "CHRONIC DISEASES",
    slug: "chronic-diseases",
    color: "bg-teal-800",
    icon: Heart,
    image: "/chronic disease.png",
    items: [
      { name: "Diabetes", desc: "Frequent urination, excessive thirst, fatigue" },
      { name: "Heart Disease", desc: "Chest pain, shortness of breath, irregular heartbeat" },
      { name: "Hypertension", desc: "Headache, dizziness, blurred vision" },
    ],
  },
  {
    title: "INFECTIOUS DISEASES",
    slug: "infectious-diseases",
    color: "bg-blue-800",
    icon: Activity,
    image: "/Infectious Diseases.png",
    items: [
      { name: "Influenza", desc: "Body aches, fever, chills" },
      { name: "COVID-19 / Viral Infections", desc: "Fever, cough, breathing issues" },
      { name: "Tuberculosis (TB)", desc: "Persistent cough, weight loss, night sweats" },
    ],
  },
  {
    title: "MENTAL HEALTH DISORDERS",
    slug: "mental-health-disorders",
    color: "bg-purple-800",
    icon: Brain,
    image: "/Mental Health Disorders.png",
    items: [
      { name: "Depression", desc: "Sadness, low energy, loss of interest" },
      { name: "Anxiety", desc: "Restlessness, rapid heartbeat, overthinking" },
      { name: "Stress-related Disorders", desc: "Headache, sleep problems, irritability" },
    ],
  },
  {
    title: "RESPIRATORY DISEASES",
    slug: "respiratory-diseases",
    color: "bg-sky-800",
    icon: Wind,
    image: "/Respiratory Diseases.png",
    items: [
      { name: "Asthma", desc: "Wheezing, shortness of breath" },
      { name: "Chronic Bronchitis", desc: "Cough with mucus, fatigue" },
    ],
  },
  {
    title: "LIFESTYLE DISEASES",
    slug: "lifestyle-diseases",
    color: "bg-emerald-800",
    icon: Scale,
    image: "/Lifestyle Diseases.png",
    items: [
      { name: "Obesity", desc: "Weight gain, low energy" },
      { name: "Fatty Liver Disease", desc: "Abdominal discomfort, fatigue" },
      { name: "PCOS (Women)", desc: "Irregular periods, weight gain, acne" },
    ],
  },
  {
    title: "DIGESTIVE DISORDERS",
    slug: "digestive-disorders",
    color: "bg-orange-800",
    icon: Droplets,
    image: "/Digestive Disorders.png",
    items: [
      { name: "Acidity / GERD", desc: "Heartburn, chest discomfort" },
      { name: "Constipation", desc: "Hard stool, bloating" },
      { name: "Ulcer", desc: "Stomach pain, burning sensation" },
    ],
  },
  {
    title: "BONE & JOINT DISORDERS",
    slug: "bone-joint-disorders",
    color: "bg-amber-800",
    icon: Bone,
    image: "/Bone & Joint Disorders.png",
    items: [
      { name: "Arthritis", desc: "Joint pain, stiffness" },
      { name: "Osteoporosis", desc: "Weak bones, fractures" },
    ],
  },
];

export default function DiseaseSection() {
  return (
    <section className="py-20 px-4 md:px-20 bg-[#f9fafb]" id="diseases-section">
      <div className="text-center mb-16">
        <span className="text-[#22aa4f] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Medical Intelligence</span>
        <h2 className="text-4xl md:text-5xl font-black text-[#111827] mb-6 leading-tight">
          Early Symptoms. <br className="md:hidden" />Smart Prevention.
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Your body gives signals before any disease becomes serious. Explore the most common conditions and learn how to heal naturally with Sunnah superfoods.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto">
        {diseases.map((disease, idx) => (
          <Link
            key={idx}
            href={`/diseases/${disease.slug}`}
            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:bg-[#22aa4f]"
          >
            {/* Image Section */}
            <div className={`${disease.color} h-48 flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              {disease.image ? (
                <Image
                  src={disease.image}
                  alt={disease.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full">
                  <div className="size-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-500">
                    <disease.icon size={32} strokeWidth={2} className="text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-black text-[#111827] mb-4 group-hover:text-white transition-colors">
                {disease.title}
              </h3>

              <p className="text-gray-500 text-sm font-medium leading-relaxed flex-1 mb-6 group-hover:text-white transition-colors">
                It is a long established fact that a reader will be distracted.
              </p>

              <div className="inline-flex items-center gap-2 text-[#22aa4f] font-bold text-sm group-hover:text-white hover:gap-3 transition-all">
                View All Details
                <ShieldCheck size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
