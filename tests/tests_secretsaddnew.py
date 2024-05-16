from playwright.sync_api import Playwright, sync_playwright, expect
import re
from tests_removegateway import tot_count, tot_pass
import time
import logging
from tests_addgateway import rs_time

logging.basicConfig(filename=f'tests_{rs_time}.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
def run(playwright: Playwright) -> None:
    start_time = time.strftime('%Y-%m-%d %H:%M:%S')
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(storage_state="state.json")
    page = context.new_page()


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

    
    # Login ----------------------------
    global tot_count, tot_pass
    page.goto("https://javelin.live/gateways")
    page.get_by_role("button", name="tester1000 Gateway").click()
    role_check("Configuration")
    page.get_by_role("link", name="Secrets").click()
    role_check("Secrets")
    page.get_by_role("link", name="Add New").click()
    role_check("Add Secret")
    page.get_by_placeholder("Secret Name").click()
    page.get_by_placeholder("Secret Name").fill("Test Secret")
    text_check(ctx="Secret Name", text="Test Secret")
    page.get_by_placeholder("API Secret Key", exact=True).click()
    page.get_by_placeholder("API Secret Key", exact=True).fill("1000")
    page.get_by_placeholder("API Secret Key Name").click()
    page.get_by_placeholder("API Secret Key Name").fill("1000")
    text_check(ctx="API Secret Key Name", text="1000")
    page.get_by_placeholder("API Group").click()
    page.get_by_placeholder("API Group").fill("Test Group")
    text_check(ctx="API Group", text="Test Group")
    page.get_by_placeholder("Organization").click()
    page.get_by_placeholder("Organization").fill("Test Org")
    text_check(ctx="Organization", text="Test Org")
    page.get_by_role("combobox").select_option("anthropic")
    combo_check(ctx="anthropic")
    page.get_by_role("combobox").select_option("Anyscale")
    combo_check(ctx="Anyscale")
    page.get_by_role("combobox").select_option("azure_openai")
    combo_check(ctx="azure_openai")
    page.get_by_role("combobox").select_option("cohere")
    combo_check(ctx='cohere')
    page.get_by_role("combobox").select_option("google")
    combo_check(ctx='google')
    page.get_by_role("combobox").select_option("Mistral AI")
    combo_check(ctx='Mistral AI')
    page.get_by_role("button", name="save").click()
    try:
        expect(page.get_by_role("heading", name="Secrets")).to_be_visible()
        try:
            tot_count += 1
            page.get_by_text("Key Added Successfully").to_be_visible()
            print("Secret Save Test: PASSED")
            tot_pass += 1
        except:
            print("Secret Save Test: FAILED")
        try:    
            page.get_by_role("button", name="Back").click()
        except:
            pass
        page.get_by_label("close").click()
        page.get_by_role("row", name="Test Secret ********** Copy").get_by_role("button").nth(1).click()
        role_check("Edit Secret")
        text_check(ctx="Secret Name", text="Test Secret")
        page.get_by_placeholder("Secret Name").fill("Test Secret2")
        text_check(ctx="Secret Name", text="Test Secret2")
        page.get_by_role("button", name="save").click()
        try:
            tot_count += 1
            page.get_by_text("Key Updated Successfully").to_be_visible()
            print("Secret Edit Test: PASSED")
            tot_pass += 1
        except:
            print("Secret Edit Test: FAILED")
        page.get_by_label("close").click()
        page.get_by_role("cell", name="Test Secret").click()
        page.get_by_role("row", name="Test Secret ********** Copy").get_by_role("button").nth(2).click()
        page.get_by_role("button", name="Cancel").click()
        role_check("Edit Secret")
        page.get_by_role("cell", name="Test Secret").click()
        page.get_by_role("row", name="Test Secret ********** Copy").get_by_role("button").nth(2).click()
        page.get_by_role("button", name="Remove").click()
        try:
            tot_count += 1
            page.get_by_text("Key Deleted Successfully").to_be_visible()
            print("Secret Delete Test: PASSED")
            tot_pass += 1
        except:
            print("Secret Delete Test: FAILED")
        page.get_by_label("close").click()
        page.get_by_role("link", name="Analytics").click()
        role_check("Analytics")
        page.get_by_role("link", name="Secrets").click()
        try:
            tot_count += 1
            expect(page.get_by_text("You haven't added any secrets")).to_be_visible()
            print('Secret Test: PASSED')
            tot_pass += 1
        except:
            print('Secret Test: FAILED')
    except:
        print('Key already exists')
    
    if tot_pass == tot_count:
        print("All SecretsAdd Tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} SecretsAdd Tests failed')
        boollast = False


    # ---------------------
    context.close()
    browser.close()

    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"AddSecrets Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")

with sync_playwright() as playwright:
    run(playwright)

