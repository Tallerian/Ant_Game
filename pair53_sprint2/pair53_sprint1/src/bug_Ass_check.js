
let bug_err_id = "Bug Assembler file"
export function CheckBugCode(fileContent, i) {
    bug_err_id = "Bug Assembler file " + i.toString() + ": ";
    const lines = fileContent.split('\n');

    let Pass = true

    //now we loop through each line testing if the test cases work
    for(let i = 0; i < lines.length; i++){

        //identifying what function is called by splitting out the spaces
        const words = lines[i].trim().split(/\s+/);

        if(Pass === false){
            console.log(bug_err_id + "failed at " + (i-1).toString())
            return bug_err_id + "failed at line " + (i-1).toString()
        }
        
        //making a case
        switch (words[0]){
            case 'sense':
                Pass = test_sense(words);
                break;
            case 'mark':
                Pass = test_mark(words);
                break;
            case 'pickup':
                Pass = test_pickup(words);
                break;
            case 'drop':
                Pass = test_drop(words);
                break;
            case 'turn':
                Pass = test_turn(words);
                break;
            case 'move':
                Pass = test_move(words);
                break;
            case 'flip':
                Pass = test_flip(words);
                break;
            default:
                Pass = false;
                break;
        }

        

    }

    return; //means it has passed all test cases
}

// --- Sense function test case
function test_sense(words){

    //following the test cases for sense function  

    if (words.length !== 5+2) {
        return false;
      }
    
    if (isNaN(words[2]) || isNaN(words[3])) {
        return false;
    }

    return true;
}


// ---------------- following the test cases for mark function  
// -------------- NOTE: this can work for both mark and unmark function according to documentation
function test_mark(words){


    if (words.length !== 3+2) {
        return false;
    }

    if(isNaN(words[1]) && isNaN(words[2])){
        return false;
    }

    // checking if the marker is btn 0 and 5 
    const num = parseInt(words[1]);
    if (num >= 0 && num <= 5 && Number.isInteger(num)) {
        return true;
    } else {
        return false;
    }

}

// ------------------ pickup function test cases
function test_pickup(words){

    if (words.length !== 3+2) {
        return false;
    }

    if(isNaN(words[1]) && isNaN(words[2])){
        return false;
    }   
    
    return true;

}

// ------------------ drop function test cases
function test_drop(words){

    if (words.length !== 2+2) {
        return false;
    }

    if(isNaN(words[1])){
        return false;
    }  

    return true;

}

// ---------------- turn function test case
function test_turn(words){

    if (words.length !== 3+2) {
        return false;
    }

    const check_left_right = words[1].toLowerCase();
    if(!check_left_right === 'left' || !check_left_right === 'right'){
        return false;
    }

    if(isNaN(words[2])){
        return false;
    }

    return true;

}

// ----------------- move function test case
function test_move(words){


    if (words.length !== 5) {
        return false;
    }

    if (isNaN(words[1]) || isNaN(words[2])) {
        return false;
    }
    return true;
}

// ---------------- flip function test case

function test_flip(words){

    if (words.length !== 4+2) {
        return false;
    }

    if (isNaN(words[1]) || isNaN(words[2] || isNaN(words[3]))) {
        return false;
    }

    return true;
}