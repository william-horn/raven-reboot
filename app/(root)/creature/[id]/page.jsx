"use client";

import Image from "next/image";
import Page from "@/components/Page";
import Text from "@/components/Typography/Text";
import Link from "next/link";
import Heading from "@/components/Typography/Heading";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import getWikiUrlFromName from "@/util/getWikiUrlFromName";


const StatsRow = function({
  children,
  name,
  value
}) {


  if (typeof value === "object") {
    value = toString(value);
  }

  return (
    <div className="flex justify-between">
      <Text className="min-w-fit">{name}</Text>
      <div className="bg-button-primary w-full h-[1px] mx-3 my-auto"></div>
      <Text className={{ self: "font-normal min-w-fit" }}>{value}</Text>
    </div>
  );
}

const StatsTable = function({
  children,
  title
}) {
  return (
    <div className="flex-wrap flex-1 mb-10 min-w-fit">
      <Heading h3 className={{ self: "text-2xl text-center mb-4" }}>{title}</Heading>
      <div className="w-[80%] mx-auto">
        {children}
      </div>
    </div>
  );
}

const CreaturePage = function() {
  const params = useParams();
  const [loaded, setLoaded] = useState(false);
  const [creatureData, setCreatureData] = useState({
    name: "[ Loading... ]",
    drops: [],
    stats: {},
    description: "[ Loading... ]"
  });

  useEffect(() => {
    if (!loaded) {
      fetch(`/api/creatures?id=${params.id}`)
        .then(res => res.json())
        .then(data => {
          setCreatureData(data);
          setLoaded(true);
        });
    }
  }, []);

  const getStats = (stats) => {
    const arr = [];

    for (let key in stats) {
      const v = stats[key];
      if (key !=="_id") {
        arr.push([ key, v ]);
      }
    }

    console.log(arr);
    return arr;
  }

  return (
    <Page>
      <Page.Content max className="min-h-screen px-0">
        <div className=" bg-[#13141c]">

           {/* Top bar */}
          <div className="p-4 mb-8 top-section">
    
            <div className="flex justify-center inner-top-section">
              
              <div className="flex flex-col items-center title-headshot">
                <Link href={getWikiUrlFromName('Creature', creatureData.name)}>
                  <Heading 
                  className={{ 
                    self: "text-3xl mb-4 font-normal rounded text-center p-4 font-logo" 
                  }}>
                    Creature: <span className="text-[#a35bff] underline">{creatureData.name}</span>
                  </Heading>
                </Link>

                <div className="relative w-[14rem] h-[14rem] rounded">
                  <Image
                  alt=''
                  src="/images/monster_placeholder_image.png"
                  fill
                  className="p-2 rounded-[50%] bg-button-primary drop-shadow-[0_0_8px_black]"
                  />
                </div>
              </div>

            </div>
          </div>

          <Page.Content max className="mb-20 middle-section">
            <div className="flex flex-col inner-middle-section sm:flex-row">
              
              <StatsTable title="Stats">
                {/* <StatsRow name="Damage" value={creatureData.stats.out_boost}/>
                <StatsRow name="Healing" value={creatureData.stats.out_healing}/> */}
                {
                  getStats(creatureData.stats).map(data => {
                    return <StatsRow key={data[0]} name={data[0]} value={data[1]}/>
                  })
                } 
              </StatsTable>

              <StatsTable title="Dropped Items">
                <Heading>Coming Soon</Heading>
              </StatsTable>

            </div>
          </Page.Content>


          <Page.Content max className="bottom-section">
            <div className="flex flex-col inner-bottom-section sm:flex-row">
              
              <StatsTable title="Drop Rates">
                {/* <StatsRow name="Damage" value={creatureData.stats.out_boost}/>
                <StatsRow name="Healing" value={creatureData.stats.out_healing}/> */}
                <Heading>Coming Soon</Heading>
              </StatsTable>

            </div>
          </Page.Content>
        </div>
      </Page.Content>
    </Page>
  );
}

export default CreaturePage;