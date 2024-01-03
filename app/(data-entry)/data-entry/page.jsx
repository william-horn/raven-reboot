
"use client";

import Page from "@/components/Page";
import Content from "@/components/Content";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
import Quantifier from "@/components/Buttons/Quantifier";
import { StatelessImageButton } from "@/components/Buttons/ImageButtons";
import { StatelessButton } from "@/components/Buttons/Buttons";

const DataEntryPage = function({

}) {

  return (
    <Page>
      <Content span="max" className="flex flex-col h-screen">
        <Content className="mx-auto mt-8">
          <Heading textSize="3xl" className="font-bold w-fit">New Entry</Heading>
        </Content>

        <Content span="max" className="flex h-full gap-5 mx-auto mt-8">
          <Content className="">
            <Heading>Records Preview</Heading>
            <Content span="max" className="flex flex-col items-center gap-4 p-4">

              <Content className="flex items-center gap-2 rounded">
                <StatelessButton>Record 1</StatelessButton>
                <StatelessImageButton src="/icons/minus_icon.svg" className={{ self: "bg-red-800 hover:bg-red-900 w-9 h-9" }}/>
              </Content>

              <Content className="flex items-center gap-2 rounded">
                <StatelessButton>Record 1</StatelessButton>
                <StatelessImageButton src="/icons/minus_icon.svg" className={{ self: "bg-red-800 hover:bg-red-900 w-9 h-9" }}/>
              </Content>

              <Content className="flex items-center gap-2 rounded">
                <StatelessButton>Record 1</StatelessButton>
                <StatelessImageButton src="/icons/minus_icon.svg" className={{ self: "bg-red-800 hover:bg-blue-900 w-9 h-9" }}/>
              </Content>

            </Content>
          </Content>

          <Content className="">
            <Heading>Current Record</Heading>
            <Content span="max" className="flex flex-col items-center">
              <Text>Dropped Item</Text>

              <Content className="flex flex-col items-center gap-4 p-4">
                <Content className="flex items-center gap-2 rounded">
                  <StatelessButton>Record 1</StatelessButton>
                  <Quantifier/>
                </Content>

                <Content className="flex items-center gap-2 rounded">
                  <StatelessButton>Record 1</StatelessButton>
                  <Quantifier/>
                </Content>

                <Content className="flex items-center gap-2 rounded">
                  <StatelessButton>Record 1</StatelessButton>
                  <Quantifier/>
                </Content>
              </Content>

            </Content>
          </Content>


          <Content className="">
            <Heading>Drops Preview</Heading>
            <Content span="max" className="flex flex-col items-center gap-4 p-4">

              <Content className="flex items-center gap-2 rounded">
                <StatelessButton>Record 1</StatelessButton>
                <StatelessImageButton src="/icons/minus_icon.svg" className={{ self: "bg-red-800 hover:bg-red-900 w-9 h-9" }}/>
              </Content>

              <Content className="flex items-center gap-2 rounded">
                <StatelessButton>Record 1</StatelessButton>
                <StatelessImageButton src="/icons/minus_icon.svg" className={{ self: "bg-red-800 hover:bg-red-900 w-9 h-9" }}/>
              </Content>

              <Content className="flex items-center gap-2 rounded">
                <StatelessButton>Record 1</StatelessButton>
                <StatelessImageButton src="/icons/minus_icon.svg" className={{ self: "bg-red-800 hover:bg-red-900 w-9 h-9" }}/>
              </Content>

            </Content>
          </Content>
        </Content>
        

      </Content>
    </Page>
  );
}

export default DataEntryPage;