import type { ComponentType, SvelteComponent } from "svelte";
import type { CardAction } from "@material-cards/core";

export type SvelteIcon = ComponentType<SvelteComponent>;

export interface SvelteCardAction extends CardAction {
  icon?: SvelteIcon;
}
