let url = "https://api.propublica.org/congress/v1/113/senate/members.json";


let app = new Vue({  
    el: '#app',  
    data: { 
        url : "https://api.propublica.org/congress/v1/113/senate/members.json",
        allMembersNoChange: [],
        members : [],
        checkedParty: [],
        states: [],
        selected: "all"
    },

	methods: {
        getData: function () {

			fetch(this.url, {
                method: "GET",
                dataType: 'json',
				headers: {
					'X-API-Key': 'tiQxXEDdzyhqZ5ryRa8wJXpSKhsSyitFxtVJiHc1',
				}
            })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong, try again later');
                }
            })
            .then(function (defaultData) {
                app.allMembersNoChange = defaultData.results[0].members;
                console.log(app.allMembersNoChange);
                app.members = app.allMembersNoChange;
                app.democrats_check = document.getElementById("d_checkbox")
                app.republicans_check = document.getElementById("r_checkbox")
                app.independents_check = document.getElementById("i_checkbox")
                //app.json2table(members);
                app.createDropdownFilter();
                //app.showState();
            });
        },

       
      
        filterByParty: function (){
            let filteredArray = [];
            if(this.checkedParty.length == 0){
                return this.allMembersNoChange;
            } else {
                for (let i = 0; i < this.allMembersNoChange.length; i++) {
                    if (app.checkedParty.includes(this.allMembersNoChange[i].party)){
                        filteredArray.push(this.allMembersNoChange[i]);
                    }
                }
                        return filteredArray;
            }
                
                        
        },

        filterByState: function (array){
            let filteredMembers = [];
            if (this.selected === "all"){
                this.members = array;
            } else {
                for(member of array){
                    if(member.state === this.selected){
                        filteredMembers.push(member);
                    }
                }
                this.members = filteredMembers;
            }
        
        },

        filterAll: function () {
            let filteredArray = this.filterByParty()
            this.filterByState (filteredArray)
        },




        createDropdownFilter: function(){
            let allStates = [];
                for (let i = 0; i < this.members.length; i++) {
                    if (!allStates.includes(this.members[i].state)) {
                        allStates.push(this.members[i].state);
                    }
                }
                
       
        this.states = allStates.sort();
        console.log(this.states)
        },
       
        
        showState: function() {
            let state = document.getElementById("allStates").value
            this.filterByState(state);
        },
    

},

 mounted() {
     this.getData();
 }

});




