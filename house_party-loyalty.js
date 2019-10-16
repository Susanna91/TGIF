let url = "https://api.propublica.org/congress/v1/113/house/members.json";

let democrats = [];
let republicans = [];
let independents = [];

let allDemocratsVotes = [];
let allRepublicansVotes = [];
let allIndependentsVotes = [];

let bottom10PctParty = [];
let top10PctParty = [];
let statistics;
let members;


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
        partyPctVoted(allDemocratsVotes);
        partyPctVoted(allRepublicansVotes);
        partyPctVoted(allIndependentsVotes);
        partyLoyalty(sortMembers(members), true);
        partyLoyalty(sortMembers(members), false);

        createHouseTable(statistics, "houseTable");
        createTable2("leastLoyalTable", bottom10PctParty);
        createTable2("mostLoyalTable", top10PctParty);
    })


// number of reps 
function partyObjects() {
    statistics = {
        "parties": [
            {
                "party": "Democrats",
                "number_of_members": democrats.length,
                "votes_with_party_pct": partyPctVoted(allDemocratsVotes) + " %"
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



function membersParty(members) {
    
    for (let i = 0; i < members.length; i++) {
   
        if (members[i].party === "D") {
           
            democrats.push(members[i]);
          
            allDemocratsVotes.push(members[i].votes_with_party_pct);
        } else if (members[i].party === "R") {
            republicans.push(members[i]);
            allRepublicansVotes.push(members[i].votes_with_party_pct);
        } else {
            independents.push(members[i]);
            allIndependentsVotes.push(members[i].votes_with_party_pct);
        }
    }
}


// average votes with party
function partyPctVoted(arr) {

    if (arr.length === 0) {
        return "0"
    }
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    let average = Math.round(sum / arr.length);
    return average;
}


// table
function createHouseTable(statistics, idname) {
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


function sortMembers(members) {
    let allMembers = Array.from(members);
    allMembers.sort(function (a, b) {
        return (a.votes_with_party_pct > b.votes_with_party_pct) ? 1 : ((b.votes_with_party_pct > a.votes_with_party_pct) ? -1 : 0);
    });
    return allMembers;
}


function partyLoyalty(sortMembers, arr2) {

    let num = Math.round(sortMembers.length * 0.1);
    if (arr2) {
        for (let i = 0; i < num; i++) {
            bottom10PctParty.push(sortMembers[i]);
        }

        for (let j = num; j < sortMembers.length; j++) {
            if (sortMembers[j].votes_with_party_pct === sortMembers[num - 1].votes_with_party_pct) {
                bottom10PctParty.push(sortMembers[j]);
            }
        }
    } else {

        for (let k = sortMembers.length - 1; k > sortMembers.length - num - 1; k--) {
            top10PctParty.push(sortMembers[k]);
        }
        for (let l = sortMembers.length - num - 1; l > 0; l--) {
            if (sortMembers[l].votes_with_party_pct === sortMembers[sortMembers.length - num].votes_with_party_pct) {
                top10PctParty.push(sortMembers[l]);
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
        let totalVotes = arr[i].total_votes;
        let partyVotes =arr[i].votes_with_party_pct + " %";
        let cells = [name, totalVotes, partyVotes];


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