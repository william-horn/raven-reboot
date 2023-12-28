import Page from "@/components/Page";
import Link from "next/link";
import Image from "next/image";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";

const AboutPage = function() {
  
  return (
    <Page>
      <Page.Content max>
        <Page.Content large>
          <Heading className={{ self: "text-center font-logo-2 text-4xl" }}>About Raven</Heading>
        </Page.Content>
      </Page.Content>
    </Page>
  );
}

export default AboutPage;