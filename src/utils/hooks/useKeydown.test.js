import { fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useKeydown from "../useKeydown";

describe("useKeydown hook", () => {
  test("should handle keydown event", () => {
    const callback = jest.fn();
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    const view = renderHook(() => useKeydown("Escape", callback));
    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.spyOn(document, "removeEventListener");
    view.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);

    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("shouldn`t handle unnecessary keydown event", () => {
    const callback = jest.fn();
    const event = new KeyboardEvent("keydown", { key: "Enter" });

    renderHook(() => useKeydown("Escape", callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
