
import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 800 } });

test('capture gallery', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(10000);

  // 1. Translator / Sakura
  await page.screenshot({ path: '1_traductor_sakura.png' });

  // 2. Dictionary / Flashcards
  const dictBtn = page.getByRole('button', { name: /Librería/i }).first();
  await dictBtn.click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '2_libreria_list.png' });

  // 3. AI Chat
  const chatBtn = page.getByRole('button', { name: /Maestro/i }).first();
  await chatBtn.click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '3_maestro_ia.png' });
});
