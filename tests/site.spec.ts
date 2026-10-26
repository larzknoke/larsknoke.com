import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openContact(page: Page) {
  await page.getByRole("button", { name: "Deine Idee. Unser Start." }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

async function mockCaptcha(page: Page) {
  await page.route("https://www.google.com/recaptcha/api.js**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `window.grecaptcha = {
      ready: function(callback) { callback(); },
      render: function(element, options) {
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Spamschutz bestätigen (Test)';
        button.onclick = function() { options.callback('test-only-captcha-token'); };
        element.appendChild(button);
        return 0;
      },
      reset: function() {}
    };`,
    }),
  );
}

async function completeCaptcha(page: Page) {
  await page
    .getByRole("button", { name: "Spamschutz laden & aktivieren" })
    .click();
  await page
    .getByRole("button", { name: "Spamschutz bestätigen (Test)" })
    .click();
}

async function fillForm(page: Page) {
  await page.getByRole("textbox", { name: "Dein Name" }).fill("Test Person");
  await page
    .getByRole("textbox", { name: "Deine E-Mail" })
    .fill("test@example.com");
  await page
    .getByRole("textbox", { name: "Deine Idee" })
    .fill("Dies ist eine simulierte Projektanfrage für den Browsertest.");
}

test.beforeEach(async ({ page }) => {
  // Never send a real message during automated tests.
  await page.route("https://formcarry.com/**", (route) => route.abort());
});

test("homepage is responsive, loads original imagery and has no runtime errors", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (/^https?:/.test(request.url()) && !request.url().includes("127.0.0.1"))
      external.push(request.url());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/Lars Knoke.*Webdesign/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Design.Code.Wirkung.",
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await expect(page.locator(".hero-image")).toBeVisible();
  expect(
    await page
      .locator(".hero-image")
      .evaluate((img: HTMLImageElement) => img.naturalWidth),
  ).toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("homepage.png"),
    fullPage: true,
  });
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("navigation and mobile menu reach the right section", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menü öffnen" }).click();
  await page
    .getByRole("navigation", { name: "Hauptnavigation" })
    .getByRole("link", { name: "Code", exact: true })
    .click();
  await expect(page).toHaveURL(/#code$/);
  await expect(
    page.getByRole("heading", { name: /Sieht gut aus\.\s*Kann auch was\./ }),
  ).toBeInViewport();
  if (isMobile)
    await expect(
      page.getByRole("button", { name: "Menü öffnen" }),
    ).toHaveAttribute("aria-expanded", "false");
});

test("dialog traps keyboard focus and restores it after Escape", async ({
  page,
}) => {
  await page.goto("/");
  await openContact(page);
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  for (let i = 0; i < 18; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("dialog")?.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Deine Idee. Unser Start." }),
  ).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("form validates fields and only confirms an accepted submission", async ({
  page,
}) => {
  await mockCaptcha(page);
  let body = "";
  await page.route("https://formcarry.com/**", async (route) => {
    body = route.request().postData() || "";
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ code: 200, status: "success" }),
    });
  });
  await page.goto("/");
  await openContact(page);
  await expect(
    page.getByRole("button", { name: "Nachricht senden" }),
  ).toBeDisabled();
  await completeCaptcha(page);
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  expect(body).toBe("");
  await fillForm(page);
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  await expect(
    page.getByRole("heading", { name: /Der erste Schritt\s*ist gemacht\./ }),
  ).toBeVisible();
  expect(body).toContain("test@example.com");
  expect(body).toContain("test-only-captcha-token");
  await page.getByRole("button", { name: "Zurück zur Seite" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("provider failure preserves inputs and allows retry", async ({ page }) => {
  await mockCaptcha(page);
  let attempts = 0;
  await page.route("https://formcarry.com/**", async (route) => {
    attempts++;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ code: attempts === 1 ? 400 : 200 }),
    });
  });
  await page.goto("/");
  await openContact(page);
  await fillForm(page);
  await completeCaptcha(page);
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "Das hat leider nicht geklappt",
  );
  await expect(page.getByRole("textbox", { name: "Dein Name" })).toHaveValue(
    "Test Person",
  );
  await expect(page.getByRole("textbox", { name: "Deine Idee" })).toHaveValue(
    /simulierte Projektanfrage/,
  );
  await completeCaptcha(page);
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  await expect(
    page.getByRole("heading", { name: /Der erste Schritt\s*ist gemacht\./ }),
  ).toBeVisible();
  expect(attempts).toBe(2);
});

test("captcha is only requested after activation and its failure shows an alternative", async ({
  page,
}) => {
  let captchaRequests = 0;
  await page.route("https://www.google.com/recaptcha/api.js**", (route) => {
    captchaRequests++;
    return route.abort();
  });
  await page.goto("/");
  await openContact(page);
  expect(captchaRequests).toBe(0);
  await page
    .getByRole("button", { name: "Spamschutz laden & aktivieren" })
    .click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "Spamschutz ist gerade nicht verfügbar",
  );
  expect(captchaRequests).toBe(1);
  await expect(
    page.getByRole("button", { name: "Nachricht senden" }),
  ).toBeDisabled();
});

test("homepage and contact dialog pass automated WCAG checks", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const homepage = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(homepage.violations).toEqual([]);
  await openContact(page);
  const dialog = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialog.violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("contact.png") });
});

test("legal pages, legacy redirects and 404 work", async ({ page }) => {
  await page.goto("/imprint");
  await expect(page).toHaveURL(/\/impressum$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Impressum.",
  );
  await page.getByRole("link", { name: "Datenschutzhinweisen" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Datenschutz.",
  );
  await page.goto("/design");
  await expect(page).toHaveURL(/\/#design$/);
  const response = await page.goto("/diese-seite-gibt-es-nicht");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Platz für eine Idee",
  );
});

test("small screens and reduced motion remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".hero-heading > span").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await openContact(page);
  expect(
    await page
      .getByRole("dialog")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
});

test("scroll animations reveal content when motion is enabled", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const section = page.locator(".about-copy");
  await expect(section).toHaveAttribute("data-revealed", "false");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute("data-revealed", "true");
  await expect(section).toHaveCSS("opacity", "1");
});

test("external captcha challenge can receive interaction above the modal", async ({
  page,
}) => {
  await page.route("https://www.google.com/recaptcha/api.js**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `window.grecaptcha = {
      ready: function(callback) { callback(); },
      render: function(element, options) {
        var anchor = document.createElement('button');
        anchor.type = 'button';
        anchor.textContent = 'Bildabfrage öffnen (Test)';
        anchor.onclick = function() {
          var challenge = document.createElement('div');
          challenge.style.cssText = 'position:fixed;inset:20%;z-index:2000000000;background:#fff;display:grid;place-items:center';
          var confirm = document.createElement('button');
          confirm.textContent = 'Bildabfrage bestätigen (Test)';
          confirm.onclick = function() { options.callback('test-only-captcha-token'); challenge.remove(); anchor.focus(); };
          challenge.appendChild(confirm);
          document.body.appendChild(challenge);
          confirm.focus();
        };
        element.appendChild(anchor);
        return 0;
      },
      reset: function() {}
    };`,
    }),
  );
  await page.goto("/");
  await openContact(page);
  await page
    .getByRole("button", { name: "Spamschutz laden & aktivieren" })
    .click();
  await page.getByRole("button", { name: "Bildabfrage öffnen (Test)" }).click();
  await page
    .getByRole("button", { name: "Bildabfrage bestätigen (Test)" })
    .click();
  await expect(
    page.getByRole("button", { name: "Nachricht senden" }),
  ).toBeEnabled();
});
