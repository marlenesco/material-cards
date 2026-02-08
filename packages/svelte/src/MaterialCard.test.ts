import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import MaterialCard from "./MaterialCard.svelte";
import TestIcon from "./TestIcon.svelte";

describe("Svelte MaterialCard", () => {
  it("toggles uncontrolled open state and calls onOpenChange", async () => {
    const onOpenChange = vi.fn();

    render(MaterialCard, {
      card: { title: "Svelte card" },
      defaultOpen: false,
      onOpenChange
    });

    await fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("renders external icon component in action", () => {
    render(MaterialCard, {
      card: {
        title: "Svelte icon",
        actions: [{ id: "fav", label: "Preferiti", icon: TestIcon }]
      }
    });

    expect(screen.getByTestId("svelte-icon")).toBeInTheDocument();
    expect(screen.getByText("Preferiti")).toBeInTheDocument();
  });
});
