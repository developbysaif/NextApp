import Image from "next/image";

const diseases = [
  {
    title: "CHRONIC DISEASES",
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
    color: "bg-green-800",
    icon: "/icons/lungs.png",
    items: [
      { name: "Asthma", desc: "Wheezing, shortness of breath" },
      { name: "Chronic Bronchitis", desc: "Cough with mucus, fatigue" },
    ],
  },
  {
    title: "Lifestyle Diseases (2026 Trending)",
    color: "bg-green-800",
    icon: "/icons/lungs.png",
    items: [
      { name: "Obesity", desc: "Weight gain, low energy" },
      { name: "Fatty Liver Disease", desc: "Abdominal discomfort, fatigue" },
      { name: "PCOS (Women)", desc: "Irregular periods, weight gain, acne" },
    ],
  },
  {
    title: "Digestive Disorders",
    color: "bg-green-800",
    icon: "/icons/lungs.png",
    items: [
      { name: "Acidity / GERD", desc: "Heartburn, chest discomfort" },
      { name: "Constipation", desc: "Hard stool, bloating" },
      { name: "Ulcer", desc: "Stomach pain, burning sensation" },
    ],
  },
  {
    title: "Bone & Joint Disorders",
    color: "bg-green-800",
    icon: "/icons/lungs.png",
    items: [
      { name: "Arthritis", desc: "Joint pain, stiffness" },
      { name: "Osteoporosis", desc: "Weak bones, fractures" },
    ],
  },
];

export default function DiseaseSection() {
  return (
    <section className="py-16 px-4 md:px-20 bg-gray-50">
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
          <div key={idx} className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 group transition-transform duration-300 hover:-translate-y-1">
            <div className={`${disease.color} px-6 py-5 text-white`}> 
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Image src={disease.icon} alt={disease.title} width={30} height={30} className="" />
                </div>
                <h3 className="text-xl font-semibold">{disease.title}</h3>
              </div>
            </div>
            <div className="bg-white p-6 text-gray-700 space-y-4">
              <ul className="space-y-3">
                {disease.items.map((item, i) => (
                  <li key={i} className="text-sm leading-6">
                    <strong className="font-semibold text-gray-900">{item.name}:</strong> {item.desc}
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
