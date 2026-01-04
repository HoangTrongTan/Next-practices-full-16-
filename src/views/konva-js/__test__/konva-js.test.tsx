import { render, screen } from "@testing-library/react";
import KonvaJSPage from "../index";
import "@testing-library/jest-dom";

jest.mock("react-konva", () => {});
