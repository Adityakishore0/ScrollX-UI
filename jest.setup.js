import "@testing-library/jest-dom/extend-expect";

// Allow router mocks.
import { jest } from "@jest/globals";

// Mock next/router with next-router-mock
jest.mock("next/router", () => import("next-router-mock"));
