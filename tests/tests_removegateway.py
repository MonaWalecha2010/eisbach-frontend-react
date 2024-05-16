from playwright.sync_api import Playwright, sync_playwright, expect
import re
import time
from tests_playground import tot_count, tot_pass
import logging
from tests_addgateway import rs_time
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
    page.get_by_role("link", name="Name tester1000 Gateway URL").click()
    try:
        page.locator(".absolute > .inline-flex").first.click()
        page.get_by_role("button", name="Remove").click()
        tot_count += 1
        page.get_by_text("Route Deleted Successfully").click()
        print("Gateway Removed Successfully")
        tot_pass += 1
        try:
            tot_count += 1
            expect(page.get_by_text("Route Deleted Successfully"))
            print("RemoveGateway Test: PASSED")
            tot_pass += 1
        except:
            print("RemoveGateway Test: FAILED")
    except:
        print("No Gateway Available")
        pass
    
    if tot_pass == tot_count:
        print("All RemoveGateway Tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} RemoveGateway Tests failed')
        boollast = False
    
    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"RemoveGateway Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")



with sync_playwright() as playwright:
    run(playwright)
