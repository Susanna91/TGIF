
let members = defaultData.results[0].members; //All the members
let democrats_check = document.getElementById("d_checkbox")
let republicans_check = document.getElementById("r_checkbox")
let independents_check = document.getElementById("i_checkbox")
 
function json2table(members) {
let table = document.getElementById('senate-data');
let myTable = `<tr class="header">
        <td>Name</td>
        <td>Party</td>
        <td>State</td>
        <td>Years in Office</td>
        <td>% Votes w/ Party</td>
        </tr>`;

for(i = 0; i < members.length; i++){
myTable = myTable + `<tr>
        <td><a href=${members[i].url}>${middleName(members[i])}</a></td>
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct} %</td>
        </tr>`
}
table.innerHTML = myTable;
}
json2table(members);



function middleName(member) {
let name = "";
        if(member.first_name !== null) {
        name = name + member.first_name;
        }
        if(member.middle_name !== null) {
        name = name + " " + member.middle_name;
        }
        if(member.last_name !== null) {
        name = name + " " + member.last_name;
        }
        return name;
        }
 


//  iterates over the values of an iterable object         
function filterByParty() {
let filteredArray = [];
        if(democrats_check.checked) {
                for(member of members){
                        if(member.party === "D"){
                                filteredArray.push(member)
                        }
        
                }
        }
        if(republicans_check.checked) {
                for(member of members){
                        if(member.party === "R"){
                                filteredArray.push(member)
                        }
        
                }
        }
        if(independents_check.checked) {
                for(member of members){
                        if(member.party === "I"){
                                filteredArray.push(member)
                        }
        
                }
        }
        
        if (filteredArray.length == 0) {
                return members;
        }
                        else {
                                return filteredArray;
                        }
        }
 
// filter states
// step 1
function createDropdownFilter() {
let allStates = [];
        for (let i = 0; i < members.length; i++) {
                if (!allStates.includes(members[i].state)) {
                        allStates.push(members[i].state);
                }
        }

console.log(allStates.sort());

let mySelect = document.getElementById("allStates");
let myOptions = "";
    for(state of allStates){
myOptions = myOptions + `<option value=${state}>${state}</option>`
}
mySelect.innerHTML += myOptions;
}
 
createDropdownFilter()


 
// step 2
function filterByState(state, myMembers) {
let filteredStates = [];
    for(x of myMembers){
        if(x.state === state){
                filteredStates.push(x)
        }
                        json2table(filteredStates);
}
        if(state == "all"){
                json2table(myMembers);
        }
                        else{
                                return filteredStates;
                        }
}
 
function showState(){
let state = document.getElementById("allStates").value
        filterByState(state);
}
 
// checkbox + state filter
 
function filterAll(){
let myMembers = filterByParty()
        filterByState (document.getElementById("allStates").value, myMembers);
}