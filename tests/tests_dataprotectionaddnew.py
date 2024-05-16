from playwright.sync_api import Playwright, sync_playwright, expect
import re
import time
from tests_addgateway import tot_count, tot_pass
import logging
from tests_addgateway import rs_time
logging.basicConfig(filename=f'tests_{rs_time}.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
DetInfo = [
    "MAC Address Local", "Email Address", "Street Address", 
    "Phone Number", "Vehicle Identification Number", "Advertising ID", 
    "Person Name", "US Drivers License Number", "Passport", 
    "US Social Security Number (", "US Individual Taxpayer"
    ]
DetPhi = [
    "FDA Code", "ICD10 Code", "ICD9 Code", 
    "Medical Record Number", "Medical Term", "US Medicare Beneficiary", 
    "US Healthcare NPI"
    ]
DetCred = [
    "Authentication Token", "Amazon Web Services", "Azure JSON Web Token", 
    "HTTP Basic Authentication", "Google Cloud Platform API key", "GCP Credentials", 
    "HTTP Cookie and Set-Cookie", "JSON Web Token", "Encryption key", 
    "Open Authorization Client", "Password", "SSL Certificate", 
    "Storage Signed Policy Document", "Storage Signed URL", "Weakly Hashed Common Password", 
    "Common Headers Containing"
    ]
DetMisc = [
    "Credit Card Track Number", "US Employer Identification", "US Adoption Taxpayer", 
    "US Preparer Taxpayer", "US DEA Number", "US Passport", 
    "Credit Card Number"    
    ]


def run(playwright: Playwright) -> None:
    start_time = time.strftime('%Y-%m-%d %H:%M:%S')
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(storage_state="state.json")
    page = context.new_page()

    global tot_count, tot_pass
    check_count = 0
    check_pass = 0
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
    
    # Sign in -------------------------
    page.goto("https://javelin.live")
    role_check("Gateways")    
    page.get_by_role("button", name="tester1000 Gateway").click()
    role_check("Configuration")
    page.get_by_role("link", name="Data Protection").click()
    role_check("Data Protection")
    page.get_by_role("button", name="Add New").click()
    role_check("Add Data Protection")
    page.get_by_placeholder("Name").click()
    page.get_by_placeholder("Name").fill("TestProtection")
    text_check("Name", "TestProtection")
    page.get_by_placeholder("Description").click()
    page.get_by_placeholder("Description").fill("This is a test")
    text_check("Description", "This is a test")
    page.get_by_role("combobox").select_option("Likely")
    page.get_by_role("button", name="Detection Settings").click()



    # PII CHECKBOX TEST --------
    # --------------------------
    page.locator("input[name=\"collapse_PII\"]").check()
    page.locator("input[name=\"PII\"]").check()
    for items in DetInfo:
        check_count += 1
        tot_count += 1
        if items == "Passport":
            try:
                expect(page.get_by_label("Passport", exact=True)).to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")
        else:
            try:
                expect(page.get_by_label(items)).to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")

    page.locator("input[name=\"PII\"]").uncheck()

    for items in DetInfo:
        check_count += 1
        tot_count += 1
        if items == "Passport":
            try:
                expect(page.get_by_label("Passport", exact=True)).not_to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} uncheck Test: FAILED")
        else:
            try:
                expect(page.get_by_label(items)).not_to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} uncheck Test: FAILED")
    
    if check_count == check_pass:
        print("PII Test: PASSED")
    else:
        print(f"{check_count - check_pass} tests failed")
        print("PII Test: FAILED")

    page.locator("input[name=\"collapse_PII\"]").uncheck()
    try:
        tot_count += 1
        expect(page.get_by_label("Email Address")).not_to_be_visible()
        print("PII Dropdown Test: PASSED")
        tot_pass += 1
    except:
        print("PII Dropdown Test: FAILED")

    check_pass == 0
    check_count == 0

    # PHI CHECKBOX TEST --------
    # --------------------------
    page.locator("input[name=\"collapse_PHI\"]").check()
    page.locator("input[name=\"PHI\"]").check()
    for items in DetPhi:
        check_count += 1
        tot_count += 1
        try:
            expect(page.get_by_label(items)).to_be_checked()
            check_pass += 1
            tot_pass += 1
        except:
            print(f"{items} check Test: FAILED")

    page.locator("input[name=\"PHI\"]").uncheck()

    for items in DetPhi:
        check_count += 1
        tot_count += 1
        try:
            expect(page.get_by_label(items)).not_to_be_checked()
            check_pass += 1
            tot_pass += 1
        except:
            print(f"{items} uncheck Test: FAILED")
    
    if check_count == check_pass:
        print("PHI Test: PASSED")
    else:
        print(f"{check_count - check_pass} tests failed")
        print("PHI Test: FAILED")

    page.locator("input[name=\"collapse_PHI\"]").uncheck()

    try:
        tot_count += 1
        expect(page.get_by_label("FDA Code")).not_to_be_visible()
        print("PHI Dropdown Test: PASSED")
        tot_pass += 1
    except:
        print("PHI Dropdown Test: FAILED")
    check_pass == 0
    check_count == 0

    
    #CREDENTIALS AND TOKENS TEST ----------
    # -------------------------------------
    page.locator("input[name=\"collapse_credentialAndTokens\"]").check()
    page.locator("input[name=\"credentialAndTokens\"]").check()

    for items in DetCred:
        check_count += 1
        tot_count += 1
        if items == "JSON Web Token":
            try:
                expect(page.get_by_label("JSON Web Token", exact=True)).to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")
        elif items == "Password":
            try:
                expect(page.get_by_label("Password", exact=True)).to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")
        else:
            try:
                expect(page.get_by_label(items)).to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")
    
    page.locator("input[name=\"credentialAndTokens\"]").uncheck()

    for items in DetCred:
        check_count += 1
        tot_count += 1
        if items == "JSON Web Token":
            try:
                expect(page.get_by_label("JSON Web Token", exact=True)).not_to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")
        elif items == "Password":
            try:
                expect(page.get_by_label("Password", exact=True)).not_to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")
        else:
            try:
                expect(page.get_by_label(items)).not_to_be_checked()
                check_pass += 1
                tot_pass += 1
            except:
                print(f"{items} check Test: FAILED")
    
    page.locator("input[name=\"collapse_credentialAndTokens\"]").uncheck()

    if check_pass == check_count:
        print("Credentials and Tokens Check Test: PASSED")
    else:
        print(f'{check_count - check_pass} tests failed')
        print('Credentials and Tokens Check Test: FAILED')
    
    try:
        check_count += 1
        expect(page.get_by_label("Authentication Token")).not_to_be_visible()
        print("Credentials Dropdown Test: PASSED")
        check_pass += 1
    except:
        print("Credentials Dropdown Testt: FAILED")
    check_pass == 0
    check_count == 0
    

    # OTHER CHECKS ----------
    # -----------------------
    page.locator("input[name=\"sensitiveFields\"]").check()
    page.locator("input[name=\"collapse_sensitiveFields\"]").check()
    for items in DetMisc:
        check_count += 1
        tot_count += 1
        try:
            expect(page.get_by_label(items)).to_be_checked()
            check_pass += 1
            tot_pass += 1
        except:
            print(f"{items} check Test: FAILED")

    page.locator("input[name=\"sensitiveFields\"]").uncheck()

    for items in DetMisc:
        check_count += 1
        tot_count += 1
        try:
            expect(page.get_by_label(items)).not_to_be_checked()
            check_pass += 1
            tot_pass += 1
        except:
            print(f"{items} uncheck Test: FAILED")
    
    if check_count == check_pass:
        print("Miscellaneous Test: PASSED")
    else:
        print(f"{check_count - check_pass} tests failed")
        print("Miscellaneous Test: FAILED")

    page.locator("input[name=\"collapse_sensitiveFields\"]").uncheck()

    try:
        check_count += 1
        expect(page.get_by_label("US Passport")).not_to_be_visible()
        print("Miscellaneous Dropdown Test: PASSED")
        check_pass += 1
    except:
        print("Miscellaneous Dropdown Test: FAILED")
    check_pass == 0
    check_count == 0


    page.locator("input[name=\"PII\"]").check()
    page.locator("input[name=\"PHI\"]").check()
    page.locator("input[name=\"credentialAndTokens\"]").check()
    page.locator("input[name=\"collapse_sensitiveFields\"]").check()


    # ACTION SETTINGS ----------
    # --------------------------
    page.get_by_role("button", name="Action Settings").click()
    page.get_by_role("combobox").select_option("Mask")
    page.get_by_placeholder("Reject Prompt").click()
    page.get_by_placeholder("Reject Prompt").fill("Test Rejection")
    text_check("Reject Prompt", "Test Rejection")
    page.locator("div:nth-child(4) > div > .styles_toggle_switch__TGf6E > .styles_slider__89XTg").click()
    page.locator("div:nth-child(4) > div > .styles_toggle_switch__TGf6E > .styles_slider__89XTg").click()
    page.get_by_role("button", name="save").click()
    try:
        tot_count += 1
        expect(page.get_by_text("Data Protection Template")).to_be_visible()
        print("Data Protection Save Test: PASSED")
        tot_pass += 1
    except:
        print("Data Protection Save Test: FAILED")
    page.get_by_role("row", name="TestProtection de-identify").get_by_role("link").click()
    page.get_by_role("heading", name="Edit Data Protection").click()
    page.get_by_role("link", name="Back").click()
    page.get_by_role("row", name="TestProtection de-identify").get_by_role("button").click()
    page.get_by_role("button", name="Remove").click()
    try:
        tot_count += 1
        expect(page.get_by_text("Data Protection Template")).to_be_visible()
        print("Data Protection Remove Test: PASSED")
        tot_pass += 1
    except:
        print("Data Protection Remove Test: FAILED")
    
    if tot_pass == tot_count:
        print("All DataProt tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} DataProt tests failed')
        boollast = False
    
    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    # ---------------------
    context.close()
    browser.close()

    logging.info(f"AddDataProt Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")


with sync_playwright() as playwright:
    run(playwright)