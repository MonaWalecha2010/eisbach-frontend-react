from playwright.sync_api import Playwright, sync_playwright, expect
import re
import time
from tests_headingcheck import tot_count, tot_pass
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
            expect(page.locator("select[name=\"apiIssue\"]")).to_have_value(ctx)
            print(f'{ctx} ComboBox Test: PASSED')
            tot_pass += 1
        except:
            print(f'{ctx} ComboBox Test: FAILED')
    def combo_check2(ctx):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.locator("select[name=\"affectedProject\"]")).to_have_value(ctx)
            print(f'{ctx} ComboBox Test: PASSED')
            tot_pass += 1
        except:
            print(f'{ctx} ComboBox Test: FAILED')  
    def combo_check3(ctx):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.locator("select[name=\"severity\"]")).to_have_value(ctx)
            print(f'{ctx} ComboBox Test: PASSED')
            tot_pass += 1
        except:
            print(f'{ctx} ComboBox Test: FAILED')
    def combo_check4(ctx):
        global tot_count, tot_pass
        tot_count += 1
        try:
            expect(page.locator("select[name=\"library\"]")).to_have_value(ctx)
            print(f'{ctx} ComboBox Test: PASSED')
            tot_pass += 1
        except:
            print(f'{ctx} ComboBox Test: FAILED')
    

    
    page.goto("https://javelin.live/")
    role_check("Gateways")
    page.get_by_role("link", name="Support").click()
    role_check("Javelin Support")
    page.locator("select[name=\"apiIssue\"]").select_option("Gateway Configuration")
    combo_check("Gateway Configuration")
    page.locator("select[name=\"apiIssue\"]").select_option(" Reaching LLMs through Gateway")
    combo_check(" Reaching LLMs through Gateway")
    page.locator("select[name=\"apiIssue\"]").select_option("Account Settings")
    combo_check('Account Settings')
    page.locator("select[name=\"apiIssue\"]").select_option("APIs/Client Libraries")
    combo_check('APIs/Client Libraries')
    page.locator("select[name=\"apiIssue\"]").select_option("Other")
    combo_check('Other')
    page.locator("select[name=\"affectedProject\"]").select_option("663510000026")
    combo_check2('663510000026')
    page.locator("select[name=\"severity\"]").select_option("low")
    combo_check3('low')
    page.locator("select[name=\"severity\"]").select_option("medium")
    combo_check3('medium')
    page.locator("select[name=\"severity\"]").select_option("high")
    combo_check3('high')
    page.get_by_placeholder("Summary of the problem you").click()
    page.get_by_placeholder("Summary of the problem you").fill("I have a test problem")
    text_check(ctx='Summary of the problem you', text="I have a test problem")
    page.locator("select[name=\"library\"]").select_option("configuration routes")
    combo_check4('configuration routes')
    page.locator("select[name=\"library\"]").select_option("providers")
    combo_check4('providers')
    page.locator("select[name=\"library\"]").select_option("logs")
    combo_check4('logs')
    page.locator("select[name=\"library\"]").select_option("chronicle")
    combo_check4('chronicle')
    page.locator("select[name=\"library\"]").select_option("rate limiting")
    combo_check4('rate limiting')
    page.locator("select[name=\"library\"]").select_option("throttling")
    combo_check4('throttling')
    page.locator("select[name=\"library\"]").select_option("cost guardrails")
    combo_check4('cost guardrails')
    page.locator("select[name=\"library\"]").select_option("data protection")
    combo_check4('data protection')
    page.locator("select[name=\"library\"]").select_option("data archiving")
    combo_check4('data archiving')
    page.locator("select[name=\"library\"]").select_option("data protection strategies")
    combo_check4('data protection strategies')
    page.locator("select[name=\"library\"]").select_option("secrets")
    combo_check4('secrets')
    page.locator("select[name=\"library\"]").select_option("Other")
    combo_check4('Other')
    page.get_by_placeholder("Describe the issue you're").click()
    page.get_by_placeholder("Describe the issue you're").fill("This is a test issue")
    text_check(ctx="Describe the issue you're", text="This is a test issue")
    page.get_by_label("Allow Javelin Support to").check()
    try:
        tot_count += 1
        expect(page.get_by_label("Allow Javelin Support to")).to_be_checked()
        print("Support Check Test: PASSED")
        tot_pass += 1
    except:
        print("Support Check Test: FAILED")
    page.get_by_label("Allow Javelin Support to").uncheck()
    # page.get_by_role("button", name="Save").click()
    #try:
        #expect(page.get_by_text("Support Request Submitted")).to_be_visible()
        #print("Support Request Test: PASSED")
    #except:
        #print("Support Request Test: FAILED")
    # ---------------------

    if tot_pass == tot_count:
        print("All javsupp tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} javsupp tests failed')
        boollast = False
    context.close()
    browser.close()

    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"JavelinSupport Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")
    


with sync_playwright() as playwright:
    run(playwright)


