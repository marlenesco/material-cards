import { useMemo, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import type { CardAction, CardBaseProps, CardColor } from "@material-cards/core";
import styles from "./MaterialCard.module.css";

const COLOR_MAP: Record<Exclude<CardColor, "custom">, string> = {
  red: "#ef4444",
  pink: "#ec4899",
  purple: "#a855f7",
  "deep-purple": "#7e22ce",
  indigo: "#6366f1",
  blue: "#3b82f6",
  "light-blue": "#0ea5e9",
  cyan: "#06b6d4",
  teal: "#14b8a6",
  green: "#22c55e",
  "light-green": "#84cc16",
  lime: "#65a30d",
  yellow: "#eab308",
  amber: "#f59e0b",
  orange: "#f97316",
  "deep-orange": "#ea580c",
  brown: "#8b5e3c",
  grey: "#6b7280",
  "blue-grey": "#475569"
};

export type ReactIconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export interface ReactCardAction extends CardAction {
  icon?: ReactNode;
  Icon?: ReactIconComponent;
}

export interface MaterialCardProps extends Omit<CardBaseProps, "card"> {
  card: Omit<CardBaseProps["card"], "actions"> & { actions?: ReactCardAction[] };
  colorHex?: string;
}

function renderActionIcon(action: ReactCardAction) {
  if (action.icon) return action.icon;
  if (action.Icon) {
    const IconComponent = action.Icon;
    return <IconComponent aria-hidden />;
  }
  if (action.iconName) return <span aria-hidden>{action.iconName}</span>;
  return null;
}

export function MaterialCard({
  card,
  color = "blue-grey",
  colorHex,
  isOpen,
  defaultOpen = false,
  onOpenChange
}: MaterialCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen ?? internalOpen;

  const resolvedColor = useMemo(() => {
    if (color === "custom") return colorHex ?? COLOR_MAP["blue-grey"];
    return colorHex ?? COLOR_MAP[color];
  }, [color, colorHex]);

  const toggleOpen = () => {
    const next = !open;
    onOpenChange?.(next);
    if (isOpen === undefined) setInternalOpen(next);
  };

  return (
    <article className={styles.card} style={{ "--mc-color": resolvedColor } as CSSProperties}>
      <header className={styles.header}>
        <h3 className={styles.title}>{card.title}</h3>
        {card.subtitle ? <p className={styles.subtitle}>{card.subtitle}</p> : null}
      </header>

      {card.image ? <img className={styles.image} src={card.image.src} alt={card.image.alt} /> : null}

      {card.description ? (
        <section className={styles.content}>
          <p className={styles.description}>{card.description}</p>
        </section>
      ) : null}

      <section className={styles.actions}>
        <button type="button" className={styles.toggle} onClick={toggleOpen} aria-expanded={open}>
          {open ? "Close" : "Open"}
        </button>
        {card.actions?.map((action) => {
          const inner = (
            <>
              {renderActionIcon(action)}
              <span>{action.label}</span>
            </>
          );

          if (action.href) {
            return (
              <a
                key={action.id}
                className={styles.actionLink}
                href={action.href}
                aria-label={action.ariaLabel ?? action.label}
              >
                {inner}
              </a>
            );
          }

          return (
            <button key={action.id} type="button" className={styles.actionLink} aria-label={action.ariaLabel ?? action.label}>
              {inner}
            </button>
          );
        })}
      </section>

      <footer className={`${styles.footer} ${open ? styles.footerOpen : ""}`}>
        <nav className={styles.links}>
          {card.links?.map((link) => (
            <a
              key={link.href + link.label}
              className={styles.link}
              href={link.href}
              aria-label={link.ariaLabel ?? link.label}
              target={link.target}
              rel={link.target === "_blank" ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </article>
  );
}
