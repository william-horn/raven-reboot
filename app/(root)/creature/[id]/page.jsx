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
    return <></>
  }

  if (name === "rank" || name === "health") {
    return <></>
  }
  
  if (value === "[Content Not Available]") {
    value = "N/A";
  }

  name = ({
    "rank": "Rank",
    "health": "Health",
    "classification": "Class",
    "school": "School",
    "starting_pips": "Starting Pips",
    "school_pips": "School Pips",
    "out_pierce": "Pierce",
    "out_boost": "Damage",
    "inc_boost": "Inc. Damage Boost",
    "inc_resist": "Resist",
    "critical_rating": "Critical Rating",
    "critical_block_rating": "Critical Block",
    "inc_healing": "Inc. Healing",
    "out_healing": "Out. Healing",
    "shadow_pips": "Shadow Pips",
    "cheats": "Cheats"
  })[name] || (name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase());

  let valCol; 

  switch (value) {
    case "N/A":
      valCol = "text-muted";
      break;

    default:
      valCol = "text-primary";
  }

  return (
    <div className="flex flex-wrap justify-between mt-2">
      <Text className={{ self: "text-xl min-w-fit" }}>{name}</Text>
      <div className="bg-button-primary flex-1 h-[1px] mx-3 my-auto min-w-[10%]"></div>
      <Text className={{ self: `font-normal min-w-fit text-xl ${valCol}` }}>{value}</Text>
    </div>
  );
}

const StatsTable = function({
  children,
  title
}) {
  return (
    <div className="flex-wrap flex-1 mb-10 min-w-fit">
      <Heading h3 className={{ self: "text-3xl text-center mb-4 underline" }}>{title}</Heading>
      <div className="sm:w-[80%] lg:w-[60%] md:w-[75%] w-[85%] mx-auto">
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

  const getColorFromRank = rank => {
    // className=" text-re"
    
    if (rank < 3) {
      return "text-green-400";
    } else if (rank < 6) {
      return "text-green-600";
    } else if (rank < 9) {
      return "text-lime-400";
    } else if (rank < 12) {
      return "text-orange-400";
    } else if (rank < 15) {
      return "text-orange-500";
    } else if (rank < 18) {
      return "text-orange-700";
    } else if (rank < 21) {
      return "text-red-500";
    } else {
      return "text-red-700";
    }
  }

  return (
    <Page>
      <Page.Content max className="min-h-screen px-0">
        <div className=" bg-[#13141c]">

           {/* Top bar */}
          <div className="p-4 mb-8 top-section">
    
            <div className="flex justify-center inner-top-section">
              
              <div className="flex flex-col items-center title-headshot">
                
                <Heading 
                className={{ 
                  self: "text-3xl text-muted mb-4 font-normal rounded text-center p-4 font-logo" 
                }}>
                  <Link href={getWikiUrlFromName('Creature', creatureData.name)}><span className="text-[#a35bff] underline font-sans">{creatureData.name}</span></Link>
                </Heading>

                <div className="relative w-[14rem] h-[14rem]">
                  <Image
                  alt=''
                  src="/images/monster_placeholder_image.png"
                  fill
                  className="p-8"
                  />
                </div>

                <div className="mt-2">
                  <Text className={{ self: "text-3xl text-muted font-normal rounded text-center p-2 font-logo" }}>Rank: <span className={`${getColorFromRank(parseInt(creatureData.stats.rank))}`}>{creatureData.stats.rank}</span></Text>
                  <Text className={{ self: "text-3xl text-muted mb-4 font-normal rounded text-center p-2 font-logo" }}>Health: <span className="font-medium text-green-400 ">{creatureData.stats.health}</span></Text>
                </div>
              </div>

            </div>
          </div>

          <Page.Content large className="mb-20 middle-section">
            <div className="flex flex-col gap-2 inner-middle-section sm:flex-row">
              
              <StatsTable title="Stats">
                {
                  getStats(creatureData.stats).map(data => {
                    return <StatsRow key={data[0]} name={data[0]} value={data[1]}/>
                  })
                } 
              </StatsTable>

              <StatsTable title="Dropped Items">
                
              </StatsTable>

            </div>
          </Page.Content>


          <Page.Content large className="bottom-section">
            <div className="flex flex-col inner-bottom-section sm:flex-row">
              
              <StatsTable title="Drop Rates">
                
              </StatsTable>

            </div>
          </Page.Content>
        </div>
      </Page.Content>
    </Page>
  );
}

export default CreaturePage;