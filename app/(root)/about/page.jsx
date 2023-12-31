import Page from "@/components/Page";
import Content from "@/components/Content";
import Link from "next/link";
import Image from "next/image";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";

const AboutPage = function() {
  
  return (
    <Page>
      <Content span="max">
        <Content span="lg">
          <Heading type="h2" className="text-4xl text-center font-logo-2">About Raven</Heading>
        </Content>
      </Content>
    </Page>
  );
}

export default AboutPage;