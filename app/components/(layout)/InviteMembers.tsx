import { useOrganization } from "@clerk/nextjs";
import { useMemo, useState } from "react";
import { getOrg } from "@/app/store/reducers/gateway.selector";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import AddButton from "@/app/components/buttons/AddButton";
import FormInputText from "@/app/components/forms-components/FormInputText";
import { useForm, SubmitHandler } from "react-hook-form";

function InviteMember() {
  const organization = useAppSelector(getOrg);
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState<"org:member" | "admin">("admin");
  const [disabled, setDisabled] = useState(true);
  const { register, control, handleSubmit, reset, formState } = useForm();
  const btnSm = "false";

  useMemo(() => {
    if (emailAddress) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailAddress]);

  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    setDisabled(true);
  
    try {
      const response = await organization?.inviteMember({ emailAddress, role });
      console.log(response);
      console.log("first")
      if(response.status === 400)
      console.log('Invite Member Response:', response);

      if(response.status === 403)
      console.log('Invite Member Response:', response);
  
      setEmailAddress("");
      setRole("org:member");
    } catch (error) {
      console.error('Error inviting member:', error);
    } finally {
      setDisabled(false);
    }
  };
  

  return (
    <form onSubmit={onSubmit} className="m-auto" >
      <div className="grid grid-cols-6 gap-1 m-auto">
        <div className="col-span-3">
          <FormInputText
            name="name"
            type="text"
            register={register}
            handleChange={(e: any) => {
              setEmailAddress(e.target.value);
            }}
            placeholder="Enter Email Address"
            
          />
        </div>
        <div className="col-span-1 m-auto">
           {/* <label  className='text-black	 text-gray-950'>
        <input
          type="radio"
          checked={role === 'org:member'}
          onChange={() => {
            setRole('org:member');
          }}
        />
        Member
      </label> */}
          <label className="text-black text-gray-950 ">
            <input
              type="radio"
              checked={role === "admin"}
              onChange={() => {
                setRole("admin");
              }}
            />{" "}
            Admin
          </label>
        </div>
        <div className="col-span-2 m-auto">
          <button
            type="submit"
            disabled={disabled}
            className={`flex-inline btn  btn-primary bg-primary-300 hover:bg-primary-500 transition-colors py-[.313rem] lg:py-[.438rem] px-[.938rem] min-h-fit h-auto ml-auto rounded-[.313rem]`}
          >
            <span
              className={`capitalize font-normal text-white ${
                btnSm ? "text-xs" : "text-xs lg:text-sm"
              }`}
            >
              Invite User
            </span>
          </button>
        </div>
      </div>

      {/* <label  className='text-black	 text-gray-950'>
        <input
          
          type="radio"
          checked={role === 'org:member'}
          onChange={() => {
            setRole('org:member');
          }}
        />
        Member
      </label> */}
    </form>
  );
}

export default function InvitationList() {
  const { invitationList } = useOrganization({ invitationList: {} });
  // if (!invitationList) {
  //   return null;
  // }
  const revoke = async (inv: any): Promise<void> => {
    await inv.revoke();
  };
  const btnSm = "false";

  return (
    <div className="mt-5 ml-3">
      <div >
      <InviteMember />
      </div>

      <h2 className="text-black	 text-gray-950 mt-3">Pending invitations</h2>
      <ul>
        {invitationList?.map((i) => (
          <li className="text-black	 text-gray-950" key={i.id}>
            {i.emailAddress}{" "}
            <button
            type="button"
            onClick={() => revoke(i)}
            className={`flex-inline btn  btn-primary bg-primary-300 hover:bg-primary-500 transition-colors py-[.313rem] lg:py-[.438rem] px-[.938rem] min-h-fit h-auto ml-auto rounded-[.313rem]`}
          >
            <span
              className={`capitalize font-normal text-white ${
                btnSm ? "text-xs" : "text-xs lg:text-sm"
              }`}
            >
              Revoke
            </span>
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
