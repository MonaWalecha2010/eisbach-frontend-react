from playwright.sync_api import Playwright, sync_playwright, expect
import re
import time
import logging
from tests_javelinsupport import tot_count, tot_pass
from tests_addgateway import rs_time
logging.basicConfig(filename=f'tests_{rs_time}.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')



def run(playwright: Playwright) -> None:
    start_time = time.strftime('%Y-%m-%d %H:%M:%S')
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(storage_state="state.json")
    page = context.new_page()

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
    def textlabel_check(ctx, text=None):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.get_by_label(ctx)).to_have_value(text)
            print(f'{ctx} Test: PASSED')
            tot_pass += 1
        except:
            print(f'{ctx} Test: FAILED')
    def text_check(ctx, text=None):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.get_by_placeholder(ctx)).to_have_value(text)
            print(f'{ctx} Test: PASSED')
            tot_pass += 1
        except:
            print(f'{ctx} Test: FAILED')
    def combo_check(ctx):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.get_by_role("combobox")).to_have_value(ctx)
            print(f'{ctx} ComboBox Test: PASSED')
        except:
            print(f'{ctx} ComboBox Test: FAILED')

    
    page.goto("https://javelin.live/")
    role_check("Gateways")

    # ---------------------
    context.close()
    browser.close()
    
    if tot_pass == tot_count:
        print("All login tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} login tests failed')
        boollast = False
    
    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"Login Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")


with sync_playwright() as playwright:
    run(playwright)


