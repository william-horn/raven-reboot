
/*
  rank: String,
  health: String,
  classification: [],
  school: [],
  starting_pips: String,
  school_pips: [],
  out_pierce: String,
  out_boost: String,
  inc_boost: [],
  inc_resist: [],
  stunable: String,
  beguilable: String,
  critical_rating: String,
  critical_block_rating: String,
  inc_healing: String, 
  out_healing: String,
  cheats: String,
  shadow_pips: String,
*/

const formatCreatureData = (data) => {
  const na = "[Content Not Available]";

  const {
    rank=na,
    health=na,
    classification=[],
    school=[],
    starting_pips=na,
    school_pips=[],
    out_pierce=na,
    out_boost=na,
    inc_boost=[],
    inc_resist=[],
    stunable=na,
    beguilable=na,
    critical_rating=na,
    critical_block_rating=na,
    inc_healing=na,
    out_healing=na,
    cheats=na,
    shadow_pips=na,
  } = data.stats;

  return {
    ...data, 
    stats: {
      rank,
      health,
      classification,
      school,
      starting_pips,
      school_pips,
      out_pierce,
      out_boost,
      inc_boost,
      inc_resist,
      stunable,
      beguilable,
      critical_rating,
      critical_block_rating,
      inc_healing,
      out_healing,
      cheats,
      shadow_pips
    }
  }
}

export default formatCreatureData;