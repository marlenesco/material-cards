export type CardColor =
  | "red"
  | "pink"
  | "purple"
  | "deep-purple"
  | "indigo"
  | "blue"
  | "light-blue"
  | "cyan"
  | "teal"
  | "green"
  | "light-green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deep-orange"
  | "brown"
  | "grey"
  | "blue-grey"
  | "custom";

export interface CardImage {
  src: string;
  alt: string;
}

export interface CardLink {
  label: string;
  href: string;
  ariaLabel?: string;
  target?: "_self" | "_blank";
}

export interface CardAction {
  id: string;
  label: string;
  href?: string;
  ariaLabel?: string;
  iconName?: string;
}

export interface CardData {
  title: string;
  subtitle?: string;
  description?: string;
  image?: CardImage;
  links?: CardLink[];
  actions?: CardAction[];
}

export interface OpenStateProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface CardBaseProps extends OpenStateProps {
  card: CardData;
  color?: CardColor;
}
