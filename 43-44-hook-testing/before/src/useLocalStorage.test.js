import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  //  - Ensure the initial value passed to the `useLocalStorage` hook is stored in `localStorage`. This should also work with passing a function to `useLocalStorage` as well.
  it("should store the initial value (actual value) in `localStorage`", () => {
    const key = "test";
    const initialValue = 0;

    const { result } = renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      { initialProps: { key, initialValue } }
    );

    const [value] = result.current;
    expect(value).toBe(0);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue));
  });

  it("should store the initial value (function) in `localStorage`", () => {
    const key = "test";
    const initialValue = () => 0; // returns 0

    const { result } = renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      { initialProps: { key, initialValue } }
    );

    const [value] = result.current;
    expect(value).toBe(0);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(0));
  });

  // - Ensure `localStorage` is updated whenever `setValue` is called.
  it("should update `localStorage` when setValue is called with a value", () => {
    const key = "test";
    const initialValue = 0;

    const { result } = renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      { initialProps: { key, initialValue } }
    );

    const newValue = 1;

    expect(result.current[0]).toBe(initialValue);
    act(() => result.current[1](newValue));
    expect(result.current[0]).toBe(newValue);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue));
  });

  // - Ensure `localStorage` is cleared whenever `setValue` is called with undefined.
  it("should update `localStorage` when setValue is called with undefined", () => {
    const key = "test";
    const initialValue = 0;

    const { result } = renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      { initialProps: { key, initialValue } }
    );

    expect(result.current[0]).toBe(initialValue);
    act(() => result.current[1](undefined));
    expect(result.current[0]).toBe(undefined);
    expect(localStorage.getItem(key)).toBeNull();
  });

  //  - Ensure `useLocalStorage` uses the value from `localStorage` if it exists instead of the initial value passed to `useLocalStorage`.
  it("should use the value in `localStorage` if it exists", () => {
    const key = "test";
    const initialValue = 0;
    const existingValue = "some data";

    localStorage.setItem(key, JSON.stringify(existingValue));

    const { result } = renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      { initialProps: { key, initialValue } }
    );

    expect(result.current[0]).toBe(existingValue);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(existingValue));
  });
});
