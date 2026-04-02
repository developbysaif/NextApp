import Link from "next/link";
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
    items: [
      { name: "Asthma", desc: "Wheezing, shortness of breath" },
      { name: "Chronic Bronchitis", desc: "Cough with mucus, fatigue" },
    ],
  },
  {
    title: "Lifestyle Diseases",
    slug: "lifestyle-diseases",
    color: "bg-emerald-800",
    icon: Scale,
    items: [
      { name: "Obesity", desc: "Weight gain, low energy" },
      { name: "Fatty Liver Disease", desc: "Abdominal discomfort, fatigue" },
      { name: "PCOS (Women)", desc: "Irregular periods, weight gain, acne" },
    ],
  },
  {
    title: "Digestive Disorders",
    slug: "digestive-disorders",
    color: "bg-orange-800",
    icon: Droplets,
    items: [
      { name: "Acidity / GERD", desc: "Heartburn, chest discomfort" },
      { name: "Constipation", desc: "Hard stool, bloating" },
      { name: "Ulcer", desc: "Stomach pain, burning sensation" },
    ],
  },
  {
    title: "Bone & Joint Disorders",
    slug: "bone-joint-disorders",
    color: "bg-amber-800",
    icon: Bone,
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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:max-w-7xl mx-auto">
        {diseases.map((disease, idx) => (
          <div key={idx} className="group flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden relative">
            {/* Header with Icon */}
            <div className={`${disease.color} p-6 text-white relative overflow-hidden`}>
               <div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
               <div className="flex items-center gap-4 relative z-10 font-black tracking-tight text-lg">
                  <div className="size-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <disease.icon size={22} strokeWidth={2.5} />
                  </div>
                  <h3 className="leading-tight text-base md:text-lg">{disease.title}</h3>
               </div>
            </div>

            {/* List with Dividers */}
            <div className="p-6 flex flex-col flex-1">
              <ul className="space-y-3 flex-1">
                {disease.items.map((item, i) => (
                  <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:size-2 before:bg-[#22aa4f] before:rounded-full">
                    <span className="font-black text-[#111827] text-sm block mb-0.5">{item.name}</span>
                    <span className="text-gray-400 text-xs font-medium leading-relaxed block">{item.desc}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-5 border-t border-gray-50">
                <Link 
                  href={`/diseases/${disease.slug}`}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#111827] py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#22aa4f] hover:shadow-lg group/btn"
                >
                  Learn More
                  <ShieldCheck size={14} className="group-hover/btn:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
