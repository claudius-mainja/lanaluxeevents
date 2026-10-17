import { getTranslations } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { getItemsByCategory, type CategoryId } from "@/content/catalogue";

const entrances: {
  namespace: "softPlay" | "jumpingCastles" | "partyFun";
  category: CategoryId;
  href: string;
  ctaKey: string;
}[] = [
  { namespace: "softPlay", category: "soft-play", href: "/soft-play-hire", ctaKey: "softPlayCta" },
  { namespace: "jumpingCastles", category: "jumping-castles", href: "/jumping-castle-hire", ctaKey: "castlesCta" },
  { namespace: "partyFun", category: "party-fun", href: "/party-fun-hire", ctaKey: "partyFunCta" },
];

export default async function ServiceEntrances() {
  const t = await getTranslations("home.services");
  const tCat = await getTranslations("categories");

  const cards = await Promise.all(
    entrances.map(async (entrance, index) => {
      const ts = await getTranslations(entrance.namespace);
      const items = getItemsByCategory(entrance.category).slice(0, 3);
      return {
        ...entrance,
        index,
        label: tCat(entrance.namespace),
        title: ts("heroTitle"),
        lead: ts("heroLead"),
        items,
      };
    }),
  );

  return (
    <Section aria-labelledby="services-heading">
      <div>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
          <h2 id="services-heading" className="mt-4 font-display text-3xl sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-navy-300">{t("lead")}</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <li
              key={card.href}
              className="group flex flex-col overflow-hidden rounded-frame border border-line bg-white p-8 surface-raised transition-colors hover:border-deep-pink"
            >
              <span className="font-display text-5xl leading-none text-deep-pink">
                {String(card.index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-2xl text-navy">{card.label}</h3>
              <p className="mt-3 text-sm text-navy-300">{card.lead}</p>
              <ul className="mt-5 space-y-2 text-sm text-navy-300">
                {card.items.map((item) => (
                  <li key={item.id} className="flex items-baseline gap-2">
                    <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-deep-pink" />
                    {item.name}
                  </li>
                ))}
              </ul>
              <Button href={card.href} variant="outline" className="mt-8 self-start">
                {t(card.ctaKey)}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
