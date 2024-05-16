from playwright.sync_api import Playwright, sync_playwright, expect
import re
import datetime
import logging
import time
rs_time = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
tot_count = 0
tot_pass = 0

logging.basicConfig(filename=f'tests_{rs_time}.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def run(playwright: Playwright) -> None:
    start_time = time.strftime('%Y-%m-%d %H:%M:%S')
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(storage_state="state.json")
    page = context.new_page()
    page.goto("https://javelin.live/")
    global tot_count, tot_pass
    try:
        tot_count += 1
        expect(page.get_by_role("heading", name="Gateways")).to_be_visible()==True
        print("HomeScreen Test: PASSED")
        tot_pass += 1
    except:
        print("HomeScreen Test: FAILED")
    page.locator(".border-2 > .absolute").click()
    page.locator("#editGateway").get_by_placeholder("Gateway Name").click()
    page.locator("#editGateway").get_by_placeholder("Gateway Name").fill("tester1000 Gateway")
    page.locator("#editGateway").get_by_role("combobox").select_option("production")
    page.locator("#editGateway").get_by_role("combobox").select_option("development")
    page.locator("#editGateway").get_by_role("button", name="save").click()
    try:
        tot_count += 1
        expect(page.get_by_text("Gateway Updated Successfully.")).to_be_visible==True
        print("Gateway Test: PASSED")
        tot_pass += 1
    except:
        print("Gateway Test: FAILED")

    # ---------------------
    context.close()
    browser.close()

    if tot_pass == tot_count:
        print("All AddGate tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} AddGate tests failed')
        boollast = False
    
    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"AddGateway Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")

with sync_playwright() as playwright:
    run(playwright)

