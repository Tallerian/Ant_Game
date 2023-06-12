let ident = "World Map error: ";
export function CheckMapCode(code) {
    

    let lines = code.split("\n").map((line) => line.replace(new RegExp("\s"), ""));
    
    if (lines.length < 2) {
        return ident + "The file is too short.";
    }

    // -- Checking for line 0 and 1 for rows and columns
    if (isNaN(Number(lines[0]))){
        return ident + "Couldn't parse the number of lines in field. can be seen in line 0" ;
    }

    let col = parseInt(lines[0]);

    if (col <= 0) {
        return ident + "Number of lines should be positive integer. can be seen in line 0";
    }

    if (isNaN(Number(lines[1]))){
        return ident + "Couldn't parse the number of lines in field. can be seen in line 1"
    }

    let row = parseInt(lines[1]);

    if (row <= 0) {
        return ident + "Number of columns should be positive integer. can be seen in line 1";
    }



    // ------checking if for everyline the Column and row are correct
    let error_column_row = columnRowCheck(code, col, row);
    if(error_column_row){
        return error_column_row;
    }


    // ---- checking if syntax used for the map is correct
    const allowedCharacters = new RegExp("[#.\+\-1-9]+");
    let n = row;
    for (let i = 2; i < n; i++) {
        if (!allowedCharacters.test(lines[i])) {
            return(ident + "The line " + i.toString() + " contains some illegal characters.");
        }
    }

    if (!(code.includes("+")) || !(code.includes("-"))) {
        return(ident + "The field should contain both bugs' swamps.");
    }

    
    
    const horizontal_lines = new RegExp("[#]+");
    const vertical_lines = new RegExp("^#|#$");

    for (let i = 2; i < n; i++) {
        if(i == 2 || i == n - 1)
        {
            if (!horizontal_lines.test(lines[i])) {
                return(ident + "The line " + i.toString() + " should contain only walls (#).");
            }
        }
        else {
            if (!vertical_lines.test(lines[i])) {
                return(ident + "The line " + i.toString() + " should contain only walls (#).");
            }
        }
    }


    // ----- Performing test case 7.1.5 Error: Swarm have to be linked
    let swarmCheck = Swarm_linked(code);
    if (swarmCheck){
        return(swarmCheck);
    }

    return;
}


function columnRowCheck(contents, row, col) {
    const lines = contents.split('\n');
  
    //----------- checking columns
    if(lines.length !== col+2){
      return ident + "The number of Columns are not respected";
    }
  
    //----------- checking rows
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];
      const charCount = line.replace(/[\n\s]/g, '').length;
      if (charCount !== row) {
        return ident + "The number of Rows are not respected";
      }
    }
    return;
}

function Swarm_linked(fileContent){

    const lines = fileContent.split('\n');

    for (let i = 2; i < lines.length-1; i++) {
      const line = lines[i].replace(/\s/g, '');  //removing spaces
  
  
      // Check if line has + together
      if (!check_given_Character(line, '+')) {
        return (ident + "Swarm + not connected in line " + i.toString());
      }
      
      // check if line has - together
      if (!check_given_Character(line, '-')) {
        return (ident + "Swarm - not connected in line " + i.toString());
      }
    }
    return;
  
}

function check_given_Character(str, c) {
    let plusIndex = -1;
    
    
    for (let i = 0; i < str.length; i++) {
      const currentChar = str[i];
      
      if (currentChar === c) {
        // If this is the first we've seen
        if (plusIndex === -1) {
          plusIndex = i;
        }
        // If we've already seen a c before
        else {
          // If the current c is not directly after the previous one
          if (i !== plusIndex + 1) {
            return false;
          }
          plusIndex = i;
        }
      }
    }
  
    // If we iterated through the entire string without finding a problem
    return true;
}