import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MaterialCard } from "./MaterialCard";

function HeartIcon() {
  return <svg data-testid="react-icon" aria-hidden />;
}

describe("React MaterialCard", () => {
  it("toggles uncontrolled open state and calls onOpenChange", () => {
    const onOpenChange = vi.fn();

    render(
      <MaterialCard
        defaultOpen={false}
        onOpenChange={onOpenChange}
        card={{ title: "React card", actions: [{ id: "fav", label: "Preferiti", Icon: HeartIcon }] }}
      />
    );

    const toggle = screen.getByRole("button", { name: "Open" });
    fireEvent.click(toggle);

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("renders action icon component", () => {
    render(
      <MaterialCard
        card={{
          title: "React icon",
          actions: [{ id: "fav", label: "Preferiti", Icon: HeartIcon }]
        }}
      />
    );

    expect(screen.getByTestId("react-icon")).toBeInTheDocument();
    expect(screen.getByText("Preferiti")).toBeInTheDocument();
  });
});
