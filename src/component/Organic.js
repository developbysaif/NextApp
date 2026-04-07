import Card from "./Card";

export default function OrganicSection() {
    const cards = [
        { label: "Enjoy", title: "Organic Meals", img: "/Fruits.png", imgWidth: 120, imgHeight: 120, bg: "#a6763f", textClass: "text-white" },
        { label: "NEW", title: "Organic Snacks", img: "/Poradge.png", imgWidth: 120, imgHeight: 120, bg: "#214a32", textClass: "text-white" },
        { label: "Enjoy", title: "Dry Fruits", img: "/Dry Fruit.png", imgWidth: 120, imgHeight: 120, bg: "#a6763f", textClass: "text-white" },
        { label: "New", title: "Organic Herbs", img: "/Herbs.png", imgWidth: 120, imgHeight: 120, bg: "#214a32", textClass: "text-white" },
    ];

    return (
        <section className="px-6 py-10 max-w-8xl mx-auto bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {cards.map((c, i) => (
                    <Card
                        key={i}
                        label={c.label}
                        title={c.title}
                        img={c.img}
                        imgWidth={c.imgWidth}
                        imgHeight={c.imgHeight}
                        bg={c.bg}
                        textClass={c.textClass}
                    />
                ))}
            </div>
        </section>
    );
}
