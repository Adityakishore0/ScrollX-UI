import "@testing-library/jest-dom/extend-expect";

import { jest } from "@jest/globals";

jest.mock("next/router", () => import("next-router-mock"));
