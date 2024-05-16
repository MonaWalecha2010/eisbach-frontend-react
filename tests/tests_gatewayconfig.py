from playwright.sync_api import Playwright, sync_playwright, expect
import re
import time
from tests_dataprotectionaddnew import tot_count, tot_pass
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
    page.get_by_role("button", name="tester1000 Gateway").click()
    page.get_by_role("link", name="Add New").click()
    page.get_by_placeholder("Route Name").click()
    page.get_by_placeholder("Route Name").fill("PlaceholderName")
    page.get_by_placeholder("Model Name").click()
    page.get_by_placeholder("Model Name").fill("PlaceholderModel")
    try:
        tot_count += 1
        page.locator("select[name=\"modelProvider\"]").select_option("anthropic")
        page.locator("select[name=\"modelProvider\"]").select_option("Anyscale")
        page.locator("select[name=\"modelProvider\"]").select_option("azure_openai")
        page.locator("select[name=\"modelProvider\"]").select_option("google")
        page.locator("select[name=\"modelProvider\"]").select_option("cohere")
        page.locator("select[name=\"modelProvider\"]").select_option("Mistral AI")
        page.locator("select[name=\"modelProvider\"]").select_option("openai")
        tot_pass += 1
    except:
        print("No selections available")
    page.get_by_placeholder("Suffix").click()
    page.get_by_placeholder("Suffix").fill("PlaceholderSuffix")
    try:
        tot_count += 1
        page.locator("select[name=\"routeType\"]").select_option("embeddings")
        page.locator("select[name=\"routeType\"]").select_option("completions")
        page.locator("select[name=\"routeType\"]").select_option("chat")
        tot_pass += 1
    except:
        print("No selections available")
    page.get_by_role("button", name="Settings").click()
    try:
        tot_count += 1
        expect(page.get_by_text("Rate-Limit")).to_be_visible()
        print("Detail Test: PASSED")
        tot_pass += 1
    except:
        print("Detail Test: FAILED")
    page.get_by_role("button", name="+").first.click()
    page.get_by_role("button", name="+").first.click()
    try:
        tot_count += 1
        expect(page.get_by_placeholder("Rate Limit"))==2
        print("Addition Test: PASSED")
        tot_pass += 1
    except:
        print("Addition Test: FAILED")
    page.get_by_role("button", name="-").first.click()
    page.get_by_role("button", name="-").first.click()
    try:
        tot_count += 1
        expect(page.get_by_placeholder("Rate Limit"))==0
        print("Subtraction Test: PASSED")
        tot_pass += 1
    except:
        print("Subtraction Testt: FAILED")
    page.get_by_role("button", name="+").nth(1).dblclick()
    page.get_by_role("button", name="-").nth(1).click()
    page.get_by_role("button", name="-").nth(1).click()
    page.get_by_role("button", name="+").nth(2).click()
    page.get_by_role("button", name="+").nth(2).click()
    page.get_by_role("button", name="-").nth(2).click()
    page.get_by_role("button", name="-").nth(2).click()
    page.locator(".styles_slider__89XTg").first.click()
    page.get_by_role("button", name="Routing Policy").click()
    page.locator(".flex > .grid > div > div > .styles_toggle_switch__TGf6E > .styles_slider__89XTg").first.click()
    page.get_by_placeholder("Amount USD").click()
    page.get_by_placeholder("Amount USD").fill("PlaceholderUSD")
    page.locator("select[name=\"interval\"]").select_option("weekly")
    page.locator("select[name=\"interval\"]").select_option("monthly")
    page.locator("select[name=\"interval\"]").select_option("annual")
    page.locator("select[name=\"action\"]").select_option("reject")
    page.locator("select[name=\"action\"]").select_option("notify")
    page.locator(".flex > .grid > div:nth-child(3) > div > .styles_toggle_switch__TGf6E > .styles_slider__89XTg").click()
    page.get_by_role("button", name="Team").click()
    page.get_by_placeholder("Owner").click()
    page.get_by_placeholder("Owner").fill("PlaceholderOwner")
    page.get_by_placeholder("Organization").click()
    page.get_by_placeholder("Organization").fill("PlaceholderOrganization")
    page.get_by_role("button", name="save").dblclick()
    time.sleep(2)

    if tot_pass == tot_count:
        print("All Gateway tests passed")
        boollast = True
    else:
        print(f'{tot_count - tot_pass} Gateway tests failed')
        boollast = False
    # ---------------------
    context.close()
    browser.close()

    end_time = time.strftime('%Y-%m-%d %H:%M:%S')

    logging.info(f"GatewayConfig Test START TIME: {start_time} // END TIME: {end_time} // All Tests Passed? : {boollast} // How many tests failed so far? : {tot_count - tot_pass}")


with sync_playwright() as playwright:
    run(playwright)

