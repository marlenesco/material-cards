import type { OpenStateProps } from "./types";

export interface OpenController {
  getState: () => boolean;
  setState: (next: boolean) => void;
  toggle: () => void;
}

export function createOpenController(
  props: OpenStateProps,
  onInternalChange: (next: boolean) => void
): OpenController {
  let internalOpen = props.defaultOpen ?? false;

  const getState = () => (props.isOpen ?? internalOpen);

  const emit = (next: boolean) => {
    props.onOpenChange?.(next);
    if (props.isOpen === undefined) {
      internalOpen = next;
      onInternalChange(next);
    }
  };

  return {
    getState,
    setState: (next: boolean) => emit(next),
    toggle: () => emit(!getState())
  };
}
