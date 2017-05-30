export default class {

  constructor() {
    'ngInject';
  }

  processSingleImage (url) {
  	this.url = url;
  	//var jsonfile = require("jsonfile");
	var datafile = "imageStats.json";
  	var Clarifai = require('clarifai');
	var modelID = "c0c0ac362b03416da06ab3fa36fb58e3"
	var app = new Clarifai.App(
	  'nDIeP1Baph5TsKp62QVn-VqXtm3prGOfENsgBMA5',
	  'AOneD_evVC6sVxpnykAVk6r1L_E7mstM10NBeIKa'
	);
	
	var imageStats = {
		totalPpl: 0,
		numMale: 0,
		numFemale: 0,
		malePct: 0,
		femalePct: 0,
	}

	var recordGenderData = function (person){
	    var genderData = person.data.face.gender_appearance;
	    return genderData;
	};

	var determineGender = function (genderData) {
		var gender = genderData.concepts[0].name;
		if (gender === "feminine"){
			imageStats.numFemale += 1;
		} else {
			imageStats.numMale += 1;
		}
	};

	var findPcts = function () {
		imageStats.malePct = imageStats.numMale / imageStats.totalPpl * 100;
		imageStats.femalePct = imageStats.numFemale / imageStats.totalPpl * 100;
	};

	return app.models.predict(modelID, url).then(
	    function(response) {
	    	let people = response.outputs[0].data.regions;
			imageStats.totalPpl = people.length;
			people.map(person => {
				let genderData = recordGenderData(person);
				determineGender(genderData);
			})
			findPcts();
			//writeToFile(imageStats);
            return imageStats;
	    },
	    

	    function(err) {
	    	console.error(err);
	    }

	);

  }



}
