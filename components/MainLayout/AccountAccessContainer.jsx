"use client";

import { 
  StatefulButton,
  StatelessButton
} from "../Buttons/Buttons.jsx";

import Icon from "../Graphics/Icon";
import Text from "../Typography/Text";

const AccountAccessContainer = function({

}) {
  return (
    <div className="p-3 account-access-container">
      <div className="flex flex-col items-center gap-2 login-container sm:flex-row">
        <StatelessButton 
        rightIcon="/icons/profile_icon.svg"
        className={{ self: "font-bold bg-transparent underline hover:bg-transparent min-w-fit" }}>
          Sign Up
        </StatelessButton>
        <StatelessButton 
        rightIcon="/icons/login_icon.svg"
        className={{ self: "font-bold" }}>
          Login
        </StatelessButton>
      </div>
    </div>
  );
}

export default AccountAccessContainer;