var app = new Vue({
	el: '#app',
	data: {
		polls: [],
		text: '',
		testVar: "Test text",
	},
	
	created: function(){
		this.getPolls();
	},
	
	computed: {
		returnPolls: function(){
			//this.getPolls();	//is this necessary?
			return this.polls;
		},
	},

	methods: {
		addPoll:function(){
			//alert(this.text);
			axios.post("/api/polls", {
				text:this.text,
				totalResponses: 0,
				yesResponses: 0,
				percentAgree:0,
			}).then(response => {
				this.text = "";  				
				this.getPolls();
				return true;
      		}).catch(err => {
      		});
		},
		getPolls: function(){
			//alert("getPolls called");
			axios.get("/api/polls").then(response => {
			this.polls = response.data;
		  	console.log(this.polls);
			return true;
		      }).catch(err => {
		      });
		
		},	
		addYes: function(prompt){
			prompt.totalResponses++;
			prompt.yesResponses++;
			prompt.percentAgree = Math.round((100 / prompt.totalResponses) * prompt.yesResponses);
			//alert("This is prompt totalResponses: " + prompt.totalResponses);
			axios.put("/api/polls/" + prompt.id, {
				text:prompt.text,
				totalResponses:prompt.totalResponses,
				yesResponses:prompt.yesResponses,
				percentAgree:prompt.percentAgree,

			}).then(response => {
  				return true;
      		}).catch(err => {
      		});
		},
		addNo: function(prompt){
			prompt.totalResponses++;
			//prompt.yesResponses++;
			prompt.percentAgree = Math.round((100 / prompt.totalResponses) * prompt.yesResponses);
			//alert("This is prompt totalResponses: " + prompt.totalResponses);
			axios.put("/api/polls/" + prompt.id, {
				text:prompt.text,
				totalResponses:prompt.totalResponses,
				yesResponses:prompt.yesResponses,
				percentAgree:prompt.percentAgree,

			}).then(response => {
  				return true;
      		}).catch(err => {
      		});

		},
	},

});	//end of vue app