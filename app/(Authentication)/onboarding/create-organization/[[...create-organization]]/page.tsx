"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import { CreateOrganization } from "@clerk/nextjs";
import { useAppDispatch } from "@/app/store/hooks";
import { AxiosResponse } from "axios";
import AppService from "@/app/services/AppService";
import { successToast, errorToast } from "@/app/helper/toastMsg";
import {
  setGateway,
  setIsGatewayProcessing,
} from "@/app/store/reducers/gateway.reducer";
import Form from "@/app/components/forms-components/Form";
import FormInputText from "@/app/components/forms-components/FormInputText";
import SaveButton from "@/app/components/forms-components/SaveButton";
import { clerkClient } from "@clerk/nextjs";
import { createOrganization } from "@/app/services/ClerkApiService";
import styles from "../../../../styles/styles.module.scss";
import { CircleCloseXs } from "@/app/components/icons/svgIcons";
import { setOrg } from "@/app/store/reducers/gateway.reducer";
import { saveOrganiationMetaData } from "@/app/services/ClerkApiService";
import Link from "next/link";
import moment from "moment";
import MailServices from "@/app/services/MailServices";

const CreateOrganizationPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [orgName, setOrgName] = useState<string>("");
  const [orgnId, setOrgnId] = useState<string>("");
  const [regEerror, setRegError] = useState({
    orgName: false,
  });
  const [inprogress, setInProgress] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [remainChar, setRemainChar] = useState<number>(15);
  const [regErrorMsg, setRegErrorMsg] = useState({
    orgName: "",
  });
  const [gatwayTempData, setGatewayTempData] = useState<{
    status: string;
    namespace: string;
    base_url: string;
  }>();

  const router = useRouter();
  const { register, control, handleSubmit } = useForm();
  const handleOrgChange = (name: string) => {
    setRemainChar(name?.length > 15 ? 0 : 15 - name?.length);
    setOrgName(name);
  };
  const handleCreateOrganization = async () => {
    setInProgress(true);
    if (orgName === "") {
      setRegError({
        orgName: orgName === "",
      });
      return;
    }
    if (clerkClient && user) {
      const createdBy = user?.id;
      try {
        const organization = await createOrganization({
          name: orgName,
          createdBy: createdBy,
        });
        if (organization !== undefined && organization?.status === 200) {
          setOrgnId(() => organization?.data?.id);
          dispatch(setOrg(organization?.data));
          MailServices.onBoardingMail({
            email: user?.primaryEmailAddress?.emailAddress,
            organization: orgName,
            organization_id: organization?.data?.id,
          });
          //
          createAccount(organization?.data?.id);
          router.push("/onboarding/success");
        }
      } catch (err) {
        console.error(err);
        setInProgress(false);
      }
    }
  };
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && (orgName === "" || !isAgree)) {
      e.preventDefault();
    }
  };
  const createAccount = (orgId:string) => {
    setInProgress(true);
    let data = {
      namespace: orgName,
      organization_id: orgId,
      mode: "development",
    };
    try {
      setGatewayTempData({
        status: "",
        namespace: orgName,
        base_url: "https://api.javelin.live/",
      });
      dispatch(setIsGatewayProcessing(true));
      AppService.createAccount(data)
        .then((res: AxiosResponse) => {
          if (res?.status === 200) {
            dispatch(setIsGatewayProcessing(false));
            //successToast("Gateway Added Successfully. ");
            saveOrgMeta(orgId ,res);
            // closeModal(openedModal);
            // let updatedOrg = await saveOrganiationMetaData(organizationId, {Gateways : [...gatewaysList, {...res?.data, namespace:name, mode:mode, status: 200, lastUpdated : moment().format()}]} )
            // if(updatedOrg !== undefined){dispatch(setOrg(updatedOrg?.data?.data))}
            // resetGateway();
            // saveData({account_id : res?.data?.account_id, organization_id : organizationId} , res?.data?.api_key_value)
          } else {
            errorToast(res?.data?.message);
            setInProgress(false);
            dispatch(setIsGatewayProcessing(false));
            dispatch(setIsGatewayProcessing(false));
          }
        })
        .catch((error: any) => {
          error("Some error occurred. Try again later. ");
          setInProgress(false);
          dispatch(setIsGatewayProcessing(false));
        });
    } catch (error) {
      console.log(error);
    }
  };
  const saveOrgMeta = async (orgId:string , res: any) => {
    let updatedOrg = await saveOrganiationMetaData(orgId, {
      Gateways: [
        {
          ...res?.data,
          namespace: orgName,
          mode: "development",
          status: 200,
          lastUpdated: moment().format(),
        },
      ],
    });
    setInProgress(false);

    if (updatedOrg !== undefined) {
      dispatch(setOrg(updatedOrg?.data?.data));
      const orgData = updatedOrg?.data?.data;
      const newGateway =
        updatedOrg?.data?.data?.publicMetadata?.Gateways.filter(
          (data: any) => data?.namespace === name
        );
      if (orgData && newGateway && newGateway?.length > 0 && orgName)
        sendGatewayMail(orgData, newGateway, orgName);
    }
    //saveData({account_id : res?.data?.account_id, organization_id : organizationId} , res?.data?.api_key_value)
  };
  const sendGatewayMail = async (
    orgData: any,
    gWayData: any,
    userData: any
  ) => {
    let sendEmail = await MailServices.gatewayMail({
      gateway_name: gWayData[0]?.namespace,
      account_id: gWayData[0]?.account_id,
      organization_id: orgData?.id,
      organization_name: orgData?.name,
      user_id: userData?.id,
      user_name: userData?.fullName,
      user_email: userData?.primaryEmailAddress?.emailAddress,
    });
    if (sendEmail !== undefined) {
      console.log(sendEmail);
    }
    setInProgress(false);
  };

  // useEffect(()=>{
  //   if(orgId!=='' && user?.organizationMemberships[0]?.organization?.id==='' || user?.organizationMemberships[0]?.organization?.id === undefined){
  //     router.push('/gateways');
  //     setInProgress(false);
  //   }
  // }, [orgId]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5 place-content-center	">
        <div className="lg:col-span-4 h-screen order-2 lg:order-1">
          <div
            className={`relative h-full md:rounded-tr-[2.5rem] md:rounded-br-[2.5rem]   ${styles.authBg}`}
            style={{
              backgroundImage:
                "url(/images/javelin_flying_upwards_with_speed.png)",
            }}
          >
            <h2 className="absolute bottom-1 right-3 md:bottom-[2.25rem] md:right-[3.25rem] text-base md:text-xl text-white font-bold">
              Javelin
            </h2>
          </div>
        </div>
        <div className="relative lg:col-span-4 px-3 py-5 md:px-0 sm:pl-[3rem] md:pl-[4rem] flex items-center order-1 lg:order-2">
          <div className="text-left md:mr-auto max-w-[560px] md:max-w-[28.875rem]">
            <div className="absolute top-1 right-1 md:top-5 md:right-5">
              <button
                onClick={() => signOut(() => router.push("/sign-in"))}
                className="btn btn-sm border-primary-100 text-xs text-white bg-primary-100 rounded-full inline-flex items-center hover:bg-primary-100 hover:text-white w-[30px] h-[30px] p-0 md:p-2 md:w-auto md:h-auto"
              >
                <span className="hidden md:block">Exit</span>{" "}
                <CircleCloseXs color="white" />
              </button>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-[700] text-primary-100">
              Identify your Organization
            </h1>
            <div className="my-4 text-sm text-black-100">
              If you haven&apos;t settled on a name yet, don&apos;t worry. You
              can select a placeholder now and update your organization&apos;s
              name at any time in the future.{" "}
            </div>
            <div className="my-4 text-sm text-black-100">
              Please confirm your agreement with our{" "}
              <Link
                className="text-primary-100"
                href="/terms-of-use"
                target="_blank"
              >
                {" "}
                Terms of Service
              </Link>
              ,{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-primary-100"
              >
                Privacy Policy
              </Link>
              , and End User{" "}
              <Link
                className=" text-primary-100"
                href="/license-agreement"
                target="_blank"
              >
                License Agreement
              </Link>{" "}
              before proceeding.
            </div>
            <Form
              onSubmit={handleCreateOrganization}
              handleSubmit={handleSubmit}
              register={register}
              className="form lg:w-[25rem]"
              onKeyPress={onKeyPress}
            >
              <div className=" grid gap-3 col-span-1 w-full mt-[2.5rem]">
                <div>
                  <FormInputText
                    name="name"
                    // label="Organization Name"
                    //labelDesc= {`${remainChar} characters remaining`}
                    showTooltip={true}
                    tooltip="Organization Name"
                    type="text"
                    register={register}
                    handleChange={(e: any) => {
                      handleOrgChange(e.target.value);
                    }}
                    placeholder="Organization Name"
                    error={regEerror?.orgName && orgName === ""}
                    defaultValue={orgName}
                    inputClassName="rounded-full"
                    maxLength={15}
                  />
                  <p className="my-1 ml-2 text-xs text-gray-700">
                    {remainChar} characters remaining
                  </p>
                </div>
                <div className="mt-3 mb-5 w-full">
                  <SaveButton
                    btnTitle="Create Org"
                    btnClass="btn-md rounded-full text-sm w-full "
                    inProgress={inprogress}
                    isDisabled={!isAgree || orgName?.length < 4}
                  />
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      name="isAgree"
                      type="checkbox"
                      className="rounded-[.313rem] checkbox checkbox-sm"
                      onChange={(e: any) => setIsAgree(e.target.checked)}
                    />
                    <span className="label-text ml-3 text-sm">
                      I agree to the{" "}
                      <Link
                        className="font-bold text-primary-100"
                        href="/terms-of-use"
                        target="_blank"
                      >
                        {" "}
                        Terms of Service
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="font-bold text-primary-100"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and End User{" "}
                      <Link
                        className="font-bold text-primary-100"
                        href="/license-agreement"
                        target="_blank"
                      >
                        License Agreement.
                      </Link>
                    </span>
                  </label>
                </div>
                <div className="text-primary-100 w-full text-center mt-[3rem] font-medium text-xs">
                  Step &nbsp;
                  <span className="font-bold text-md text-primary-100">
                    2 &nbsp;
                  </span>
                  of &nbsp;3&nbsp;
                </div>
                {/* <p className="text-gray-200 mt-2 mb-4 text-sm">Have an account? <Link className="text-primary-300" href="/sign-in">Sign in</Link></p> */}
              </div>
            </Form>
          </div>
          {/* <CreateOrganization afterCreateOrganizationUrl="/gateways" /> */}
        </div>
      </div>
    </>
  );
};

export default CreateOrganizationPage;
