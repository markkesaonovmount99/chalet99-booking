import { Compass, KeyRound, Mountain, ShieldCheck } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Compass,
    title: "Точный отбор",
    description:
      "Каждое шале в подборке проходит личную проверку — как экспонат перед тем, как попасть в коллекцию.",
  },
  {
    icon: Mountain,
    title: "Локация в сердце гор",
    description:
      "Куртатинское ущелье — вид, ради которого стоит ехать в Осетию, и всего 1,9 км до ближайшего ресторана.",
  },
  {
    icon: KeyRound,
    title: "Заезд без сложностей",
    description:
      "Подтверждение брони в течение суток, понятные условия и никаких скрытых платежей.",
  },
  {
    icon: ShieldCheck,
    title: "Приватность и тишина",
    description:
      "Дома стоят обособленно — можно провести время вдвоём или большой компанией без лишних глаз.",
  },
];

export function Advantages() {
  return (
    <section className="mx-auto max-w-8xl px-6 py-20 lg:px-10">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-wood-700">
          Почему Шале 99
        </p>
        <h2 className="mt-4 font-serif text-3xl text-forest-900 sm:text-4xl">
          Гостеприимство в деталях
        </h2>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ADVANTAGES.map(({ icon: Icon, title, description }) => (
          <div key={title}>
            <div className="flex size-12 items-center justify-center rounded-full bg-forest-50 text-forest-800">
              <Icon size={22} />
            </div>
            <h3 className="mt-4 font-serif text-lg text-forest-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
