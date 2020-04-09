var parse = require("date-fns/parse");
import { format ,isBefore,isAfter,addDays,getTime} from 'date-fns';

function interpolation(data) {
  let out = [];
  data = data
    .map(e => {
      return [parse(e[0] + ' 17:19:09', new Date()), e[1]];
    })
    .filter((e, idx, arr) => {
      if (idx - 1 >= 0 && arr[idx - 1][1] == arr[idx][1]) {
        return false;
      } else {
        return true;
      }
    });
  if (data.length <= 1) {
    return data;
  }
  let start_date = data[0][0];
  let c_str_date = format(start_date, "yyyy-MM-dd");
  let c_date = parse(c_str_date, "YYYY-MM-DD", new Date());
  let end_date = data[data.length - 1][0] ;
  let last_index = 0;
  let next_index = 1;

  while (c_date < end_date) {
    c_date = addDays(c_date, 1);
    c_str_date = format(c_date, "yyyy-MM-dd");
    while (
      last_index + 1 < data.length &&
      !(
        isBefore(data[last_index][0], c_date) &&
        isAfter(data[last_index + 1][0], c_date)
      )
      ) {
      last_index++;
    }
    while (
      next_index + 1 < data.length &&
      !(
        isAfter(data[next_index][0], c_date) &&
        isBefore(data[next_index - 1][0], c_date)
      )
      ) {
      next_index++;
    }


    let next_val = data[next_index][1];
    let next_date = data[next_index][0];
    let last_val = data[last_index][1];
    let last_date = data[last_index][0];
    let c_val = Math.round(
      ((next_val - last_val) / (getTime(next_date) - getTime(last_date))) *
      86400000
    );
    if (!isNaN(c_val)) out.push([c_str_date, c_val]);
  }
  return out;
}
export default interpolation;
