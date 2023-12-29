"use client";

import Image from "next/image";
import Page from "@/components/Page";
import Text from "@/components/Typography/Text";
import Link from "next/link";
import Heading from "@/components/Typography/Heading";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import getWikiUrlFromName from "@/util/getWikiUrlFromName";
import Icon from "@/components/Graphics/Icon";
import ReactBarGraph from "@/components/Graphs/ReactBarGraph";
// import BarGraph from "@/components/Graphs/BarGraph";



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

const Loading = function() {
  return (
    <div className="flex flex-row items-center justify-center w-full gap-2 pt-10">
      <Heading 
      className={{ self: "text-3xl text-center" }}>
        Loading... 
      </Heading>
      
      <Icon
      src="/icons/loading_icon.svg"
      className={{ self: "animate-spin w-8 h-8" }}
      />
    </div>
  );
}

const CreaturePage = function() {
  const params = useParams();
  const [loaded, setLoaded] = useState(false);
  const [creatureData, setCreatureData] = useState(null);

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

    // console.log(arr);
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

  // console.log(creatureData.drops);

  if (!loaded) {
    return (
      <Page>
        <Page.Content max className="min-h-screen px-0">
          <div className="h-screen bg-primary">
            <div className="flex flex-row items-center justify-center w-full gap-2 pt-10">
              <Heading 
              className={{ self: "text-3xl text-center" }}>
                Loading... 
              </Heading>
              
              <Icon
              src="/icons/loading_icon.svg"
              className={{ self: "animate-spin w-8 h-8" }}
              />
            </div>
          </div>
        </Page.Content>
      </Page>
    )
  } else {
    creatureData.name = creatureData.name.replaceAll('&amp;', '&');
  }

  return (
    <Page>
      <Page.Content max className="min-h-screen px-0">
        <div className=" bg-primary">

           {/* Top bar */}
          <div className="p-4 mb-8 top-section">
    
            <div className="flex justify-center inner-top-section">
              
              <div className="flex flex-col items-center title-headshot">
                
                <Heading 
                className={{ 
                  self: "text-3xl text-muted mb-4 font-normal rounded text-center p-4 font-logo" 
                }}>
                  <a href={getWikiUrlFromName('Creature', creatureData.name)}><span className="text-[#a35bff] underline font-sans">{creatureData.name}</span></a>
                </Heading>

                <div className="relative w-[14rem] h-[14rem]">
                  <Image
                  alt=''
                  src="/images/monster_placeholder_image.png"
                  fill
                  sizes="512px"
                  className="p-2 rounded-[50%] shadow-[0_0_10px_black]"
                  />
                </div>

                <div className="mt-4">
                  <Text className={{ self: "text-3xl text-muted font-normal rounded text-center p-2 font-logo" }}>Rank: <span className={`${getColorFromRank(parseInt(creatureData.stats.rank))}`}>{creatureData.stats.rank}</span></Text>
                  <Text className={{ self: "text-3xl text-muted mb-4 font-normal rounded text-center p-2 font-logo" }}>Health: <span className="font-medium text-green-400 ">{creatureData.stats.health}</span></Text>
                </div>
              </div>

            </div>
          </div>
        </div>



      {/* CHART TESTING ONLY */}
      <Page.Content large className="mb-10 bottom-section">
        <div className="chart-parent w-[100%]">
          <Heading h3 className={{ self: "text-center text-heading-primary xl:text-2xl lg:text-xl mb-5 underline" }}>Drop Rates 2023</Heading>
          <Text className={{ self: "text-center font-normal text-muted text-md" }}>This is currently placeholder data until further updates.</Text>
          <ReactBarGraph
          title="Robe Drop Rates 2023"
          data={[
            { label: "Soldier's Vibrant Charm", value: 3 },
            { label: "Rubal Necklace of Renewal", value: 6 },
            { label: "Shadowmark's Charm of Making (Level 45+)", value: 2 },
            { label: "Scales of Justice Charm", value: 22 },
            { label: "Burrower's Pyromancy Amulet (Level 160+)", value: 34 },
            { label: "Adventurous Ranger's Wayfinder (Level 30+)", value: 65 },
            { label: "Adept's Spear of Fortitude", value: 1 },

            { label: "Soldier's Vibrant Charm 2", value: 3 },
            { label: "Rubal Necklace of Renewal 2", value: 6 },
            { label: "Shadowmark's Charm of Making (Level 45+) 2", value: 2 },
            { label: "Scales of Justice Charm 2", value: 22 },
            { label: "Burrower's Pyromancy Amulet (Level 160+) 2", value: 34 },
            { label: "Adventurous Ranger's Wayfinder (Level 30+) 2", value: 65 },
            { label: "Adept's Spear of Fortitude 2", value: 1 },
          ]}
          />

          <br/>

          {/* <ReactBarGraph
          title="Hat Drop Rates 2023"
          data={[
            { label: "Wand", value: 3 },
            { label: "Robe", value: 6 },
            // { label: "Boots", value: 2 },
            // { label: "Deck", value: 22 },
            // { label: "Jewel", value: 34 },
            { label: "Hood", value: 65 },
            { label: "Spell", value: 1 },
          ]}
          /> */}

          {/* <br/>

          <ReactBarGraph
          title="Boot Drop Rates 2023"
          data={[
            { label: "Jewel", value: 34 },
          ]}
          /> */}
        </div>


        {/* <div className="w-[400px] h-[200px] bg-red-500 overflow-x-auto">
          <div className="w-full h-[20px] bg-blue-500">
          </div>

          <div className="w-[600px] h-[20px] bg-green-500">
          </div>
        </div> */}
      </Page.Content>

      </Page.Content>
    </Page>
  );
}

export default CreaturePage;