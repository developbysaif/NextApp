import Image from "next/image";
import Link from "next/link";

const diseases = [
  {
    title: "CHRONIC DISEASES",
    slug: "chronic-diseases",
    color: "bg-teal-800",
    icon: "/icons/heart.png",
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
    icon: "/icons/virus.png",
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
    icon: "/icons/brain.png",
    items: [
      { name: "Depression", desc: "Sadness, low energy, loss of interest" },
      { name: "Anxiety", desc: "Restlessness, rapid heartbeat, overthinking" },
      { name: "Stress-related Disorders", desc: "Headache, sleep problems, irritability" },
    ],
  },
  {
    title: "RESPIRATORY DISEASES",
    slug: "respiratory-diseases",
    color: "bg-green-800",
    icon: "/icons/lungs.png",
    items: [
      { name: "Asthma", desc: "Wheezing, shortness of breath" },
      { name: "Chronic Bronchitis", desc: "Cough with mucus, fatigue" },
    ],
  },
  {
    title: "Lifestyle Diseases",
    slug: "lifestyle-diseases",
    color: "bg-emerald-800",
    icon: "/icons/lungs.png",
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
    icon: "/icons/lungs.png",
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
    icon: "/icons/lungs.png",
    items: [
      { name: "Arthritis", desc: "Joint pain, stiffness" },
      { name: "Osteoporosis", desc: "Weak bones, fractures" },
    ],
  },
];

export default function DiseaseSection() {
  return (
    <section className="py-16 px-4 md:px-20 bg-gray-50" id="diseases-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Early Symptoms. Smart Prevention. Better Health.
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your body gives signals before any disease becomes serious. Explore the most common and major health conditions along with their early symptoms. Click on any condition to learn causes, prevention, and natural treatment options. Stay informed, stay healthy!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {diseases.map((disease, idx) => (
          <div key={idx} className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className={`${disease.color} px-6 py-5 text-white relative h-32 flex items-center`}> 
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                  <Image src={disease.icon} alt={disease.title} width={30} height={30} className="" />
                </div>
                <h3 className="text-xl font-bold leading-tight">{disease.title}</h3>
              </div>
              {/* Decorative background shape */}
              <div className="absolute right-0 bottom-0 opacity-10 size-24 -mr-4 -mb-4 bg-white rounded-full"></div>
            </div>
            <div className="bg-white p-6 text-gray-700 flex flex-col justify-between h-[calc(100%-8rem)] space-y-4">
              <ul className="space-y-3 flex-grow">
                {disease.items.map((item, i) => (
                  <li key={i} className="text-sm border-b border-gray-50 pb-2 last:border-0">
                    <span className="font-bold text-gray-900 block">{item.name}</span>
                    <span className="text-gray-500">{item.desc}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/diseases/${disease.slug}`}
                className="w-full text-center rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all transform active:scale-95 hover:bg-slate-800 hover:shadow-lg inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
