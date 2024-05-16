from playwright.sync_api import Playwright, sync_playwright, expect
import re
from tests_gatewayconfig import tot_count, tot_pass
import time
import logging
from tests_addgateway import rs_time
logging.basicConfig(filename=f'tests_{rs_time}.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
def run(playwright: Playwright) -> None:
    start_time = time.strftime('%Y-%m-%d %H:%M:%S')
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(storage_state="state.json")
    page = context.new_page()
    global tot_count, tot_pass
    global role_check
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

    
    # Sign in -------------------------
    page.goto("https://javelin.live/")
    role_check("Gateways")
    # Top Half Heading Checks ---------
    page.get_by_role("link", name="Developer").click()
    role_check("Developer")
    page.get_by_role("link", name="Integrations").click()
    role_check("Integrations")
    page.get_by_role("link", name="Usage").click()
    role_check("Usage")
    page.locator("li").filter(has_text="AccountDeveloper").get_by_role("checkbox").uncheck()
    role_check("Developer", type="link", boolVal=False)
    page.get_by_role("button", name="tester1000 Gateway").click()
    page.locator("#docs-sidebar").get_by_role("link", name="Configuration").click()
    role_check("Configuration")
    page.get_by_role("link", name="Data Protection").click()
    role_check("Data Protection")
    page.get_by_role("link", name="Chronicle").click()
    role_check("Chronicle")
    page.get_by_role("link", name="Analytics").click()
    role_check("Analytics")
    page.get_by_role("link", name="Secrets").click()
    role_check("Secrets")

    # Bottom Half Heading Checks -------
    page.get_by_role("link", name="Playground").click()
    role_check("Javelin AI Playground")
    page.get_by_role("link", name="Documentation").click()
    role_check("Javelin", ret="Y")
    page.get_by_role("link", name="Guides").click()
    role_check("Overview", ret="Y")
    page.get_by_role("link", name="API Reference").click()
    role_check("Data Model", ret="Y")
    page.get_by_role("link", name="Support").click()
    role_check("Javelin Support")
    page.goto("https://javelin.live/gateways")
    role_check("Gateways")
    if tot_count == tot_pass:
        print("All HeadingCheck tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} HeadingCheck tests failed')
        boollast = False

    # Close ---------------------
    context.close()
    browser.close()

    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"HeadingCheck Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")


with sync_playwright() as playwright:
    run(playwright)