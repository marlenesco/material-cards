import { defineComponent, markRaw, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import MaterialCard from "./components/MaterialCard.vue";

const IconStub = defineComponent({
  template: '<svg data-testid="vue-icon" aria-hidden="true" />'
});

describe("Vue MaterialCard", () => {
  it("toggles uncontrolled open state and emits change", async () => {
    const onOpenChange = vi.fn();
    const wrapper = mount(MaterialCard, {
      props: {
        defaultOpen: false,
        onOpenChange,
        card: { title: "Vue card" }
      }
    });

    await wrapper.get("button.toggle").trigger("click");
    await nextTick();

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(wrapper.emitted("open-change")?.[0]).toEqual([true]);
    expect(wrapper.get("button.toggle").text()).toBe("Close");
  });

  it("renders external icon component in action", () => {
    const wrapper = mount(MaterialCard, {
      props: {
        card: {
          title: "Vue icon",
          actions: [{ id: "fav", label: "Preferiti", icon: markRaw(IconStub) }]
        }
      }
    });

    expect(wrapper.find('[data-testid="vue-icon"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Preferiti");
  });
});
