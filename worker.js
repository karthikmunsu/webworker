
let getElem = id => document.getElementById(id);

let isComment = (val) => {
    return val.trim().charAt(0) == '#';
}

let findDuplicates = (data, {key, val, index, callback}) => {
    let duplicate_string = '';
    let len = data.length;

    return new Promise((resolve, reject) => {
        for(let cur_index = 0; cur_index < len; cur_index++) {
            let item = data[cur_index];
            let [current_key, value] = item.split('=');
            let isCommentLine = !value ? isComment(current_key) : isComment(value);
    
            if(!isCommentLine && cur_index != index && value == val) {
                // duplicate_string += (key+'='+val+'\n');
                duplicate_string += (current_key+'='+value+'\n');
            }
            if(len == cur_index+1) {
                resolve(duplicate_string);
            }
        }
    })
}

let init = (index) => {
    if(index < len) {
        let val = values[index];
        if(!(val.trim().charAt(0) == '#')) {
            // splitting the key left key and right value here
            let [key, value] = val.split('=');

            findDuplicates(values, {key, val: value, index})
                .then(res => {
                    if(res) {
                        postMessage(res+'\n');
                    }
                    init(index+1);
                })

        }else {
            init(index+1);
        }
    }
}

self.onmessage = function(e) {
    console.log(e)
}

init(0);
