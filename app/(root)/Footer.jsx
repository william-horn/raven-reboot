// "use client";

// import { 
//   StatelessButton, 
//   StatefulLink, 
//   StatelessLink,
//   ButtonPresets,
// } from "@/components/Buttons/Buttons";

import Link from "next/link";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
import Image from "next/image";

const InfoRow = ({
  name,
  value,
  underline,
  externalLink
}) => {
  return (
    <li className="flex justify-center mt-2 font-bold text-center text-muted">
      {
        externalLink 
          ? <a href={externalLink}>
              {name}<span className={`font-normal text-hyperlink hover:text-hyperlink-hover ${underline ? 'underline' : ''}`}>{value}</span>
            </a>
          
          : <span>
              {name}<span className={`font-normal text-primary ${underline ? 'underline' : ''}`}>
                {value}
              </span>
            </span>
        }
    </li>
  );
}

const InfoSection = ({
  children,
  title
}) => {
  return (
    <div className="min-w-[150px] max-w-[200px]">
      <Heading type="h2" className="text-2xl font-bold text-center text-footer-heading-primary">{title}</Heading>
      <ul>
        {children}
      </ul>
    </div>
  )
}

const Footer = function({
  children
}) {

  return (
    <footer className="py-20 bg-secondary shadow-[0_-10px_20px_black] relative z-[10]">

      <div className="flex flex-wrap justify-center items-center gap-12 pb-20 w-[70%] mx-auto">

        <InfoSection title="Contributors">
          <InfoRow name="Dev: " value="William J. Horn"/>
          <InfoRow name="Testers: " value="Coming Soon"/>
          {/* <InfoRow name="" value="William J. Horn"/> */}
        </InfoSection>

        <InfoSection title="Contact">
          <InfoRow name="Phone: " value="(Not yet available)"/>
          <InfoRow name="Email: " value="wizard101raven@gmail.com"/>
          <li className="text-sm italic font-extralight text-muted max-w-[20rem] mt-1 text-center">Please note: This email is not associated with Kingsile or company. Do not send personal information here.</li>
          <InfoRow name="Discord Server: " value="https://discord.gg/CJFED5jk" underline externalLink="https://discord.gg/CJFED5jk"/>
          {/* <InfoRow name="Github" value="https://github.com/william-horn" underline externalLink="https://github.com/william-horn"/> */}
          {/* <InfoRow name="" value="William J. Horn"/> */}
        </InfoSection>

        <InfoSection title="Social">
          <InfoRow name="Instagram: " value="(Not yet available)"/>
          <InfoRow name="Twitter: " value="(Not yet available)"/>
          <InfoRow name="Facebook: " value="(Not yet available)"/>
        </InfoSection>

        <InfoSection title="Resources">
          <InfoRow name="" value="Wizard101 Wiki" underline externalLink="https://wiki.wizard101central.com/wiki"/>
          <InfoRow name="" value="Github" underline externalLink="https://github.com/william-horn"/>
          <InfoRow name="" value="Vercel" underline externalLink="https://vercel.com/"/>
        </InfoSection>

      </div>

      <div className="w-[60%] mx-auto flex justify-center flex-col items-center">
        <Heading>Disclaimer: </Heading>
        <Text className="font-normal leading-8 text-center text-muted text-md"><b>Please note:</b> Raven is in no way affiliated with the Wizard101 team or Kingsisle corporation. We are entirely a private and separate entity. All concerns about Wizard101 or inquiries to Wizard101 leadership should be directed towards actual Wizard101 staff. If you need assistance beyond what a normal player can grant you, then you may send an email to support@wizard101.com or help@kingsisle.com, but do not seek our help for such assistance. We also do not represent the thoughts, beliefs, strategies, ideals, or intentions of Kingsisle in any way.</Text>
      </div>

      {/* Logo branding */}
      <Image
      src="/images/logo3-128.png"
      width={48}
      height={48}
      alt=""
      className="mx-auto mt-10"
      />

    </footer>
  );
}

export default Footer;