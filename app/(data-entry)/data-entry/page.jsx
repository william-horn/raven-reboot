"use client";

import Page from "@/components/Page";
import Content from "@/components/Content";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
import Quantifier from "@/components/Buttons/Quantifier";
import SearchBarDataEntry from "../SearchBarDataEntry";
import DropdownSelection from "@/components/Buttons/DropdownSelection";
import { StatelessImageButton } from "@/components/Buttons/ImageButtons";
import { StatelessButton } from "@/components/Buttons/Buttons";

const DataEntryPage = function({

}) {


  return (
    <Page>
      <Content span="max" className="flex flex-col h-screen">
        <Content className="mx-auto mt-8">
          <Heading textSize="3xl" className="font-bold text-center text-zinc-700">Raven Data Entry</Heading>
          <SearchBarDataEntry/>
        </Content>
      </Content>
    </Page>
  );
}

export default DataEntryPage;