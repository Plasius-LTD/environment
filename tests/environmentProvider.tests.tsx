import React from "react";
import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { EnvironmentProvider, useEnvironment } from "../src/environmentProvider.js";

describe("EnvironmentProvider", () => {
  it("filters to VITE_ prefixed values", () => {
    const element = EnvironmentProvider({
      env: {
        VITE_API_URL: "https://api.example.com",
        SECRET_KEY: "should-not-leak",
      },
      children: null,
    });

    expect(element.props.value).toEqual({
      VITE_API_URL: "https://api.example.com",
    });
  });

  it("throws when used outside the provider", () => {
    const BrokenConsumer = () => {
      useEnvironment();
      return <div>nope</div>;
    };

    expect(() => renderToString(<BrokenConsumer />)).toThrow(
      "useEnvironment must be used within EnvironmentProvider"
    );
  });
});
