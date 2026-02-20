import { test, expect } from "@playwright/test";
const { chromium } = require("playwright");
const { email, password, errorPassword } = require("../auth");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page
    .getByRole("link", {
      name: "Войти",
    })
    .click();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page
    .getByRole("textbox", {
      name: "Email",
    })
    .click();
  await page
    .getByRole("textbox", {
      name: "Email",
    })
    .fill(email);
  await page
    .getByRole("textbox", {
      name: "Пароль",
    })
    .click();
  await page
    .getByRole("textbox", {
      name: "Пароль",
    })
    .fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.goto("https://netology.ru/profile/9657159");

  // await expect(page.getByTestId("menu-userface").getByText("ЕА")).toContainText("ЕА");

  const resURL = "https://netology.ru/profile/9657159";
  await expect(page).toHaveURL(resURL, {
    timeout: 5000,
  });
});

test("Unsuccessful authorization ", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page
    .getByRole("link", {
      name: "Войти",
    })
    .click();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page
    .getByRole("textbox", {
      name: "Email",
    })
    .click();
  await page
    .getByRole("textbox", {
      name: "Email",
    })
    .fill(errorPassword);
  await page
    .getByRole("textbox", {
      name: "Пароль",
    })
    .click();
  await page
    .getByRole("textbox", {
      name: "Пароль",
    })
    .fill("password");
  await page.getByTestId("login-submit-btn").click();

  const expected = "Неверный email";
  const result = await page.getByText("Неверный email");
  await expect(result).toHaveText(expected);
});
