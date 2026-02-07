export interface MaterialCardOptions {
  cardActivator?: 'click' | 'hover';
  buttonSelector?: string;
}

export declare class MaterialCard {
  static defaults: Required<MaterialCardOptions>;
  constructor(element: Element, options?: MaterialCardOptions);
  open(): void;
  close(): void;
  toggle(): void;
  isOpen(): boolean;
  destroy(): void;
}

export declare function createSvgIcon(name: string, className?: string): SVGElement;
export declare function getMaterialCardInstance(element: Element): MaterialCard | null;
export declare function initMaterialCards(
  target?: string | Element | NodeListOf<Element> | Element[],
  options?: MaterialCardOptions | keyof MaterialCard
): MaterialCard[] | boolean;

export declare const icons: string[];
