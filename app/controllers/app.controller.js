var each = require('async-each');

/*Check valid month*/
function checkValidMonth(month){
	monthArray = [
		'january',
		'feburary',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december'];

	if(monthArray.indexOf(month.toLowerCase()) == -1){
		return false;
	}
	return true;
}

/*function for problem 1*/
exports.subscribers = (req, res) => {
	if(!req.params.month){
		return res.status(400).send({message:'Month cannot be empty'});
	}
	if(!checkValidMonth(req.params.month)){
		return res.status(400).send({message:'Invalid month'});
	}
	let data = req.subscriptionData;
	let month = req.params.month;
	month = month.substring(0,3);
	let startCount=0;
	let endCount=0;	
	let totalCount = 0;
	each(data,function(item,next){

		let startMonth = item['Subscription Start date'].split("/").reverse()[1];
		let endMonth = item['Subscription End Date'].split("/").reverse()[1];
		if(startMonth.toLowerCase() == month.toLowerCase()){
			startCount++;
		}
		if(endMonth.toLowerCase() == month.toLowerCase()){
			endCount++;
		}
		next();
	},function(error){
		if(error){
			return res.status(500).send({message:'Something went wrong'});	
		}else{
			res.status(200).send({gained:startCount,lost:endCount});
		}

	});
};

/*function for problem 2*/
exports.levels = (req, res) => {
	if(!req.params.month){
		return res.status(400).send({message:'Month cannot be empty'});
	}
	if(!checkValidMonth(req.params.month)){
		return res.status(400).send({message:'Invalid month'});
	}
	let data = req.subscriptionData;
	let month = req.params.month;
	month = month.substring(0,3).toLowerCase();

	let monthMap = {
		"jan":1,
		"feb":2,
		"mar":3,
		"apr":4,
		"may":5,
		"jun":6,
		"jul":7,
		"aug":8,
		"sep":9,
		"oct":10,
		"nov":11,
		"dec":12
	};
	let typeMap = {
		"Liberator":0,
		"GameChanger":0,
		"Disruptor":0
	};
	let monthValue = monthMap[month];
	let totalCount = 0;
	each(data,function(item,next){
		let startMonth = item['Subscription Start date'].split("/").reverse()[1];
		let duration = parseInt(item['SubscriptionDuration'],10);
		startMonth = startMonth.toLowerCase();
		let startMonthValue = monthMap[startMonth];
		let endMonthValue = startMonthValue+duration;
		if((monthValue >= startMonthValue) && (monthValue <= endMonthValue)){
			let type = item['Subscription Type'];
			typeMap[type]++; 
		}
		next();
	},function(error){
		if(error){
			return res.status(500).send({message:'Something went wrong'});	
		}else{
			res.status(200).send(typeMap);
		}
	});
};
