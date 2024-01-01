
/*
  A quick, improvised parsing algo for getting outer-most bracket matches
  - example with <table>
*/
const getOuterMostTable = str => {
  let opening = 0;
  let index = 0;
  let count = 0;

  let start;
  let end;

  while (true) {
    count++;

    const th = str.substring(index);
    const o = th.match('<');

    // Start searching when we find a '<' character
    if (o) {
      const ts = th.substring(o.index + 1);
      const om = ts.match("^table.*?>");

      // If the opening match is a <table...> tag:
      if (om) {
        opening++;
        index += (o.index + 1) + om[0].length;
        if (start === undefined) start = o.index;
        

      // If not an opening table tag, check to see if it's a closing </table>
      } else {
        const cm = ts.match("^\/table>");

        // If it's closing, subtract the pending opening tags and update global index
        if (cm) {
          opening--;
          index += (o.index + 1) + cm[0].length;
          
        // If neither an opening or closing <table>, then just update global index to continue searching
        } else {
          index += o.index + 1;
        }
      }
    }

    if (opening === 0) {
      end = index;
      break;

    } else if (count > 50) {
      console.log("Emergency break out of loop - something went wrong");
      break;
    }
  }

  return [start, end];
}