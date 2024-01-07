
import Page from "@/components/Page";
import Content from "@/components/Content";
import Text from "@/components/Typography/Text.jsx";
import Heading from "@/components/Typography/Heading.jsx";
import SearchBarModern from "./SearchBarModern.jsx";
import SearchResults from "./SearchResults.jsx";
import Link from "next/link";
import Logo from "@/components/Logo.jsx";
import SearchNavBar from "./SearchNavBar.jsx";

// API
import Drops from "@/models/drops/drops.js";
import DropSources from "@/models/dropsources/dropsources.js";
import ButtonGroup from "@/components/Buttons/ButtonGroup.jsx";
import { StatelessButton, StatelessLink } from "@/components/Buttons/Buttons.jsx";

import { toSimpleArray } from "@/libs/utils/api-utils.js";
import connectMongoDB from "@/libs/db/mongodb.js";
import { escapeRegex } from "@/libs/utils/escapeRegex.js";

import * as DropsAPI from "../../../models/drops/api.js";
import * as DropSourcesAPI from "../../../models/dropsources/api.js";

const searchBarFetch = async (options={}) => {
  "use server";
  
  await connectMongoDB(options.db_env);

  let {
    exclude,
    limit,
    query
  } = options;

  if (exclude.length === 0) {
    exclude = [{ name: '' }];
  } else {
    exclude = exclude.map(v => ({ name: v }));
  }

  // !important:
  /*
    Eventually, find some way to perform a single query for search bar fetching. Ideally,
    the fetch should return all beginning-of-word matches FIRST, then start looking for 
    general match cases.

    Current solution does just that - but requires two separate queries. Find solution
    with only one query later.
  */

  // Query 1: Find beginning-of-word matches
  const data = await Drops.find({
    $nor: exclude,
    $and: [ 
      { name: {"$regex": "^" + escapeRegex(query), "$options": "i"} },
    ]
  })
  .limit(limit);


  // Query 2: Find general matches
  const newExl = [];
  
  for (let k = 0; k < data.length; k++) {
    newExl[k] = { name: data[k].name }
  }

  let data2 = null;

  if (data.length < limit) {
    data2 = await Drops.find({
      $nor: [...exclude, ...newExl],
      $and: [ 
        { name: {"$regex": escapeRegex(query), "$options": "i"} },
      ],
    })
    .limit(limit - data.length);
  } else {
    data2 = [];
  }

  // simulated delay
  // await new Promise(r => setTimeout(r, 6000));

  return toSimpleArray([...data, ...data2]);
}

const fetchSearchResults = async (options={}) => {
  "use server";

  
}

const SearchPage = function({ 


}) {

  return (
    <Page className="">
      <Content span="max" className="relative flex">

        <Content className="w-[300px] min-w-[15rem] h-screen bg-primary-inset sticky top-0 hidden md:block z-[10]">
          <div className="flex flex-col items-center justify-center pb-9 pt-7">
            <Link href="/"><Logo className="pointer-events-none select-none opacity-40 grayscale" width={56} height={56}/></Link>
          </div>
          <Content>
            <Heading className="font-bold text-inset-secondary" textSize="lg">Quick Reference</Heading>
            <Content className="flex flex-col items-center justify-center">
              <Text className="font-light text-muted">No activity so far</Text>
            </Content>
          </Content>
        </Content>

        <Content span="max" className="">

          <Content span="max" className="sticky top-0 px-3 py-4 bg-primary shadow-[0_10px_30px_#0c0c0c]"> 
            <Content span="max" className="flex gap-2">
              <SearchBarModern fetchResults={searchBarFetch}/>
            </Content>

            <Content className="mt-1">
              <SearchNavBar/>
            </Content>
          </Content>

          <Content span="max" className="px-4 pt-4 pb-4">
            <SearchResults fetchSearchResults={fetchSearchResults}/>
          </Content>
          
        </Content>

      </Content>
    </Page>
  )
};

export default SearchPage;