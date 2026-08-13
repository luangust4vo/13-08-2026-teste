import { validar } from "../src/utils/validarCnpj.js";

describe("Validador de CNPJ", () => {
  describe("Casos de sucesso", () => {
    test("deve validar um CNPJ tradicional (somente números) com formatação", () => {
      expect(validar("06.990.590/0001-23")).toBe(true);
    });

    test("deve validar um CNPJ tradicional sem formatação", () => {
      expect(validar("06990590000123")).toBe(true);
    });

    test("deve validar um CNPJ no novo formato alfanumérico", () => {
      expect(validar("12.ABC.345/01DE-35")).toBe(true);
    });

    test("deve aceitar um CNPJ alfanumérico mesmo com letras minúsculas (case-insensitive)", () => {
      expect(validar("12.abc.345/01de-35")).toBe(true);
    });
  });

  describe("Casos de falha", () => {
    test("deve invalidar entradas nulas, vazias ou undefined", () => {
      expect(validar(null)).toBe(false);
      expect(validar(undefined)).toBe(false);
      expect(validar("")).toBe(false);
    });

    test("deve invalidar CNPJ com menos de 14 caracteres", () => {
      expect(validar("06.990.590/0001")).toBe(false);
    });

    test("deve invalidar CNPJ com mais de 14 caracteres", () => {
      expect(validar("06.990.590/0001-234")).toBe(false);
    });

    test("deve invalidar CNPJ numérico com dígitos verificadores incorretos", () => {
      expect(validar("06.990.590/0001-99")).toBe(false);
    });

    test("deve invalidar CNPJ alfanumérico com dígitos verificadores incorretos", () => {
      expect(validar("12.ABC.345/01DE-99")).toBe(false);
    });

    test("deve invalidar CNPJ contendo caracteres especiais inválidos na base", () => {
      expect(validar("12.@BC.345/01DE-35")).toBe(false);
    });

    test("deve invalidar se os dois últimos dígitos verificadores contiverem letras", () => {
      expect(validar("12.ABC.345/01DE-AB")).toBe(false);
    });
  });
});
