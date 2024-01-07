
import Content from "@/components/Content";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
import Image from "next/image";
import Link from "next/link";
import { StatelessButton } from "@/components/Buttons/Buttons";

const SearchPage__SearchResult = function({

}) {


  return (
    <Content className="mb-10 transition-colors hover:bg-primary-inset">
      <Content className="p-3">
        <Heading className="py-0 font-bold text-left" textSize="xl">Search Result Title</Heading>
        <Content className="mt-3">
          <Content>
            <Text>Search result description</Text>
          </Content>

          <Content className="mt-4">
            <StatelessButton className={{ self: "bg-pink-800 hover:bg-pink-900", inner: {self: "text-sm py-1"} }}>View on Wiki</StatelessButton>
          </Content>
        </Content>
      </Content>
    </Content>
  );
}

export default SearchPage__SearchResult;