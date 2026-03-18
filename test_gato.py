import asyncio
from playwright.async_api import async_playwright

async def test_simplicity():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Go to the local server
        await page.goto('http://localhost:5000')

        # Wait for the translator to be visible
        await page.wait_for_selector('textarea')

        # Clear and type "gato"
        textarea = page.locator('textarea')
        await textarea.fill('')
        await textarea.fill('gato')

        # Wait for translation to update
        await page.wait_for_timeout(2000)

        # Check translation
        translation = page.locator('h1:has-text("neko")')

        # Take screenshot
        await page.screenshot(path='/home/jules/verification/gato_test.png')

        # Also try "gato de bengala" (long form)
        await textarea.fill('')
        await textarea.fill('gato de bengala')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='/home/jules/verification/gato_bengala_test.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(test_simplicity())
