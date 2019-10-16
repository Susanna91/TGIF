let url = "https://api.propublica.org/congress/v1/113/senate/members.json";

let democrats = [];
let republicans = [];
let independents = [];

let allDemocratsVotes = [];
let allRepublicansVotes = [];
let allIndependentsVotes = [];

let bottom10Pct = [];
let top10Pct = [];
let statistics;



fetch(url, {
        headers: {
            "X-API-Key": "tiQxXEDdzyhqZ5ryRa8wJXpSKhsSyitFxtVJiHc1"
        }
    })
    .then(function (data) {
        return data.json();
    })
    .then(function (myData) {
        let members = myData.results[0].members;

        membersParty(members);
        partyObjects();
        attendance(sortMembers(members), true);
        attendance(sortMembers(members), false);

        createSenatesTable(statistics, "senatesTable");
        createTable2("leastEngagedTable", bottom10Pct);
        createTable2("mostEngagedTable", top10Pct);
    
    })




// number of reps 
function partyObjects() {
    statistics = {
        "parties": [
            {
                "party": "Democrats",
                "number_of_members": democrats.length,
                "votes_with_party_pct": partyPctVoted(allDemocratsVotes)+" %"
        },
            {
                "party": "Republicans",
                "number_of_members": republicans.length,
                "votes_with_party_pct": partyPctVoted(allRepublicansVotes) + " %"
        },
            {
                "party": "Independents",
                "number_of_members": independents.length,
                "votes_with_party_pct": partyPctVoted(allIndependentsVotes) + " %"
        },
            {
                "party": "Total",
                "number_of_members": democrats.length + republicans.length + independents.length,
                "votes_with_party_pct": 0
            }
        ]
    }

    averagePercentage(statistics);
}


// votes with party
function membersParty(obj) {
    
    for (let i = 0; i < obj.length; i++) {
     
        if (obj[i].party === "D") {
          
            democrats.push(obj[i]);
          
            allDemocratsVotes.push(obj[i].votes_with_party_pct);


        } else if (obj[i].party === "R") {
            republicans.push(obj[i]);
            allRepublicansVotes.push(obj[i].votes_with_party_pct);


        } else {
            independents.push(obj[i]);
            allIndependentsVotes.push(obj[i].votes_with_party_pct);
        }
    }
}


// average votes with party
function partyPctVoted(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }

    let average = Math.round(sum / arr.length);
    return average;
}

// table
function createSenatesTable(statistics, idname) {
    let parties = statistics.parties
    for (let i = 0; i < parties.length; i++) {
        let tableRow = document.createElement("tr");
        let party = parties[i].party;
        let numberOfReps = parties[i].number_of_members;
        let votesWithParty = parties[i].votes_with_party_pct;
        let cells = [party, numberOfReps, votesWithParty];

        for (let j = 0; j < cells.length; j++) {
            let tableCell = document.createElement("td");
            tableCell.append(cells[j]);
            tableRow.append(tableCell);
        }
        document.getElementById(idname).append(tableRow);
    }
}


function averagePercentage(statistics) {
    if (statistics.parties[2].number_of_members == 0) {
        statistics.parties[3].votes_with_party_pct = (((partyPctVoted(allDemocratsVotes) + partyPctVoted(allRepublicansVotes)) / 2)+ " %") ;
    } else {
        statistics.parties[3].votes_with_party_pct = (((partyPctVoted(allDemocratsVotes) + partyPctVoted(allRepublicansVotes) + partyPctVoted(allIndependentsVotes)) / 3)+ " %")
    }
}



// missed votes / order list by the value
function sortMembers(members) {
    let allMembers = Array.from(members);
    allMembers.sort(function (a, b) {
        return (a.missed_votes_pct > b.missed_votes_pct) ? 1 : ((b.missed_votes_pct > a.missed_votes_pct) ? -1 : 0);
    });
    return allMembers;
}



function attendance(sortMembers, arr2) {
  
    let num = Math.round(sortMembers.length * 0.1);
    if (arr2) {
        for (let i = 0; i < num; i++) {
            top10Pct.push(sortMembers[i]);
        }

        for (let j = num; j < sortMembers.length; j++) {
            if (sortMembers[j].missed_votes_pct === sortMembers[num - 1].missed_votes_pct) {
                top10Pct.push(sortMembers[j]);
            }
        }
    } else {

        for (let k = sortMembers.length - 1; k > sortMembers.length - num - 1; k--) {
            bottom10Pct.push(sortMembers[k]);
        }
        for (let l = sortMembers.length - num - 1; l > 0; l--) {
            if (sortMembers[l].missed_votes_pct === sortMembers[sortMembers.length - num].missed_votes_pct) {
                bottom10Pct.push(sortMembers[l]);
            }
        }
    }
}




// table
function createTable2(idname, arr) {
    for (let i = 0; i < arr.length; i++) {
        let tableRow = document.createElement("tr");
        let firstName = arr[i].first_name;
        let middleName = arr[i].middle_name;
    
        if (middleName === null) {
            middleName = "";
        }
        let lastName = arr[i].last_name;
        let name = firstName + " " + middleName + " " + lastName;
        let numMissedVotes = arr[i].missed_votes;
        let pctMissedVotes = arr[i].missed_votes_pct + " %";
        let cells = [name, numMissedVotes, pctMissedVotes];


        for (let j = 0; j < cells.length; j++) {
            let tableCell = document.createElement("td");
            tableCell.append(cells[j]);
            tableRow.append(tableCell);
        }
        document.getElementById(idname).append(tableRow);
    }
}