import { formatFileSize } from "./parsers.js";

describe("Тестирования функции для формата размера файла", () => {
  test("При значении 0", () => {
    expect(formatFileSize(0)).toBe("0 Б");
  });
  test("При значении меньше 0", () => {
    expect(formatFileSize(-1)).toBe("0 Б");
  });
  test("Корректные значения", () => {
    expect(formatFileSize(1024)).toBe("1.0 КБ");
    expect(formatFileSize(1024 * 1024)).toBe("1.0 МБ");
    expect(formatFileSize(1024 ** 3)).toBe("1.0 ГБ");
    expect(formatFileSize(1024 ** 4)).toBe("1.0 ТБ");
  });
});
