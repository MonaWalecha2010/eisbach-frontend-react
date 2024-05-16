from playwright.sync_api import Playwright, sync_playwright, expect
import re
import time
from tests_login import tot_count, tot_pass
import logging
from tests_addgateway import rs_time
logging.basicConfig(filename=f'tests_{rs_time}.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def run(playwright: Playwright) -> None:
    start_time = time.strftime('%Y-%m-%d %H:%M:%S')
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(storage_state="state.json")
    page = context.new_page()
    global tot_count, tot_pass
    def role_check(ctx, type="heading", boolVal=True, ret=None):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.get_by_role(type, name=ctx)).to_be_visible()==boolVal
            print(f"{ctx} {type} Test: PASSED")
            tot_pass += 1
        except:
            print(f"{ctx} {type} Test: FAILED")
        if ret == "Y":
            page.go_back()
        else:
            pass
    def text_check(ctx, text=None):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.get_by_placeholder(ctx)).to_have_value(text)
            print(f'{ctx} Test: PASSED')
            tot_pass += 1
        except:
            print(f'{ctx} Test: FAILED')
    
    page.goto("https://javelin.live/")
    role_check("Gateways")
    page.get_by_role("link", name="Playground").click()
    role_check("Javelin AI Playground")
    page.locator("div").filter(has_text=re.compile(r"^Route SelectionSelect a routePlaceholderName$")).get_by_role("combobox").select_option("PlaceholderName")
    page.locator("div").filter(has_text=re.compile(r"^Header TypeSelect a Header Typex-javelin-virtualapikeyauthorization$")).get_by_role("combobox").select_option("authorization")
    page.get_by_placeholder("Enter authorization").click()
    page.get_by_placeholder("Enter authorization").fill("Test Auth")
    text_check(ctx="Enter authorization", text="Test Auth")
    page.locator("div").filter(has_text=re.compile(r"^Header TypeSelect a Header Typex-javelin-virtualapikeyauthorization$")).get_by_role("combobox").select_option("x-javelin-virtualapikey")
    page.get_by_placeholder("Enter x-javelin-virtualapikey").click()
    page.get_by_placeholder("Enter x-javelin-virtualapikey").fill("Test Key")
    text_check(ctx='Enter x-javelin-virtualapikey', text="Test Key")

    page.get_by_role("button", name="Execute").click()
    page.wait_for_load_state()
    try:
        tot_count += 1
        expect(page.get_by_text("404")).to_be_visible()
        print("Playground Test: PASSED")
        tot_pass += 1
    except:
        print("Playground Test: FAILED")
    page.get_by_role("button", name="Clear Output").click()
    try:
        tot_count += 1
        expect(page.get_by_text("Output: Clear Output")).to_be_visible()
        print("Clear Output Test: PASSED")
        tot_pass += 1
    except:
        print("Clear Output Test: FAILED")
    
    if tot_pass == tot_count:
        print("All playground tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} playground tests failed')
        boollast = False

    
    # ---------------------
    context.close()
    browser.close()

    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"Playground Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")
    


with sync_playwright() as playwright:
    run(playwright)


