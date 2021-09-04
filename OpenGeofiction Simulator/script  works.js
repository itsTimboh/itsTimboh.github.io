var clicker = {
	nodes:0,
	nodes_click_gain:1,
	upgrades: {
		fastdraw: {
			amount:0,
			cost:10,
			rate:0.5,
			hasUn:false,
			unlockAt:15,
			name:"FastDraw Plugin",
			description:"Wanna draw? Wanna draw fast? Like really fast? That's what this plugin is for. Drawing fast. FastDraw."
		},
		monkey: {
			amount:0,
			cost:100,
			rate:1,
			hasUn:false,
			unlockAt:100,
			name:"A Bunch of Monkeys",
			description:"You know that theorem about an infinite amount of monkeys with an infinite amount of typewriters? Let's put those monkeys to work on something more productive."
		},
		osm: {
			amount:0,
			cost:1100,
			rate:11,
			hasUn:false,
			unlockAt:1000,
			name:"Copy From OpenStreetMap",
			description:"Why draw the nodes yourself when you can use the hard work of others?"
		},
		idcollect: {
			amount:0,
			cost:12500,
			rate:45,
			hasUn:false,
			unlockAt:10000,
			name:"Node ID Collector",
			description:"Tonnes of nodes get deleted all the time. What if you could reverse that process, and make those nodes your own?"
		},
		discord: {
			amount:0,
			cost:129800,
			rate:256,
			hasUn:false,
			unlockAt:100000,
			name:"Beg for Nodes on Discord",
			description:"Ok, listen. You clearly need nodes more than they do. Just spam every channel until someone draws some nodes for you. It'll be fine, I promise."
		},
		sock: {
			amount:0,
			cost:1280000,
			rate:1512,
			hasUn:false,
			unlockAt:1000000,
			name:"Sockpuppet Accounts",
			description:"You're drawing lots of nodes on your own, but what if there were more 'you'? Just what this site needs."
		},
		hostile: {
			amount:0,
			cost:19800000,
			rate:8900,
			hasUn:false,
			unlockAt:15000000,
			name:"Hostile Takeover",
			description:"By hacking into every account on OpenGeofiction, every node ever made on the site now belongs to you. The admins cannot stop you; their nodes are also yours."
		},
		stonks: {
			amount:0,
			cost:401000000,
			rate:58000,
			hasUn:false,
			unlockAt:300000000,
			name:"Invest on the Node Market",
			description:"Time to invest your hard earned nodes into something worthwhile... making more nodes!"
		},
		quantum: {
			amount:0,
			cost:5500000000,
			rate:300000,
			hasUn:false,
			unlockAt:4500000000,
			name:"Quantum Computing",
			description:"With your lithium-ion powered, Turing complete, Ember-brand Quantum Computer, your node drawing speeds are off the charts!"
		},
		mstr: {
			amount:0,
			cost:76000000000,
			rate:2100000,
			hasUn:false,
			unlockAt:70000000000,
			name:"Self-replicating Procedural Low-Effort Grid",
			description:"Through the power of quantum computing and artificial intelligence, your LEGs are now sentient. Grid will consume all. Hail grid."
		},
	},
	achievements:[
		{req:"clicker.nodes>0",gotten:false,text:"You have drawn your first node!"},
		{req:"clicker.nodes>100",gotten:false,text:"You have drawn 100 nodes!"},
		{req:"clicker.nodes>10000",gotten:false,text:"You have drawn 10000 nodes!"},
		{req:"clicker.nodes>1000000",gotten:false,text:"You have drawn a million nodes!"},
		{req:"clicker.nodes>1000000000",gotten:false,text:"You have drawn a billion nodes!"},
		{req:"clicker.nodes>1000000000000",gotten:false,text:"You have drawn a trillion nodes!"},
		{req:"clicker.nodes>1000000000000000",gotten:false,text:"You have drawn a quadrillion nodes!"},
		{req:"clicker.nodes>1000000000000000000",gotten:false,text:"You have drawn a quintillion nodes!"},
		{req:"clicker.nodes>1000000000000000000000",gotten:false,text:"You have drawn a sextillion nodes!"},
		{req:"clicker.nodes>1000000000000000000000000",gotten:false,text:"You have drawn a septillion nodes!"},
		{req:"clicker.nodes>1000000000000000000000000000",gotten:false,text:"You have drawn an octillion nodes!"},
		{req:"clicker.nodes>1000000000000000000000000000000",gotten:false,text:"You have drawn a nonillion nodes!"},
		{req:"clicker.nodes>1000000000000000000000000000000000",gotten:false,text:"You have drawn a decillion nodes!"},
		{req:"clicker.upgrades.monkey.amount>19",gotten:false,text:"Woah, where did all these monkeys come from?!"},
	]
};
var delay = 0;
var rate = 0;

var textLines= {
		fastdraw: {
			name:"FastDraw Plugin",
			description:"Wanna draw? Wanna draw fast? Like really fast? That's what this plugin is for. Drawing fast. FastDraw."
		},
		monkey: {
			name:"A Bunch of Monkeys",
			description:"You know that theorem about an infinite amount of monkeys with an infinite amount of typewriters? Let's put those monkeys to work on something more productive."
		},
		osm: {
			name:"Copy From OpenStreetMap",
			description:"Why draw the nodes yourself when you can use the hard work of others?"
		},
		idcollect: {
			name:"Node ID Collector",
			description:"Tonnes of nodes get deleted all the time. What if you could reverse that process, and make those nodes your own?"
		},
		discord: {
			name:"Beg for Nodes on Discord",
			description:"Ok, listen. You clearly need nodes more than they do. Just spam every channel until someone draws some nodes for you. It'll be fine, I promise."
		},
		sock: {
			name:"Sockpuppet Accounts",
			description:"You're drawing lots of nodes on your own, but what if there were more 'you'? Just what this site needs."
		},
		hostile: {
			name:"Hostile Takeover",
			description:"By hacking into every account on OpenGeofiction, every node ever made on the site now belongs to you. The admins cannot stop you; their nodes are also yours."
		},
		stonks: {
			name:"Invest on the Node Market",
			description:"Time to invest your hard earned nodes into something worthwhile... making more nodes!"
		},
		quantum: {
			name:"Quantum Computing",
			description:"With your lithium-ion powered, Turing complete, Ember-brand Quantum Computer, your node drawing speeds are off the charts!"
		},
		mstr: {
			name:"Self-replicating Procedural Low-Effort Grid",
			description:"Through the power of quantum computing and artificial intelligence, your LEGs are now sentient. Grid will consume all. Hail grid."
		},
}

function thing_clicked(thing){
	if(clicker.upgrades[thing].cost <= clicker.nodes){
		clicker.nodes-=clicker.upgrades[thing].cost;
		clicker.upgrades[thing].amount++;
		clicker.upgrades[thing].cost += Math.round(clicker.upgrades[thing].cost*0.1);
		update_upgrades();
	}
}
	
function update_upgrades(){
	document.querySelector("#upgrades").innerHTML="";
	var d = 0;
	for(i in clicker.upgrades){
		if(clicker.upgrades[i].hasUn){
			document.querySelector("#upgrades").innerHTML+= `
				<br> 
				<h4>${clicker.upgrades[i].name}</h4> <br>
				<button onclick="thing_clicked('${i}')">Buy</button> Cost: ${numberformat.format(clicker.upgrades[i].cost)}. +${clicker.upgrades[i].rate} nodes per second. You have ${numberformat.format(clicker.upgrades[i].amount)}. <br>
				<p class="upgradeDesc" >${textLines[i].description}</p>
				<br>
			`;
			d+= clicker.upgrades[i].rate*clicker.upgrades[i].amount;
		}
	}
	rate = d;
}
function update(){
	if(Cookies.get("clicker") != null && Cookies.get("clicker") != "undefined"){
		var clickerLoad = JSON.parse(Cookies.get("clicker"));
		for(i in clicker.upgrades){
			if(clickerLoad.upgrades[i] == null){
				clickerLoad.upgrades[i] = clicker.upgrades[i];
			}
		}
		for(i in clicker.achievements){
			if(clickerLoad.achievements[i] == null || clicker.achievements[i].text != clickerLoad.achievements[i].text){
				clickerLoad.achievements[i] = clicker.achievements[i];
			}
		}
		clicker = clickerLoad;
	}
			
	update_upgrades();
	if(Cookies.get("lastSession") != null){
		var lastSaveDate = Number(Cookies.get("lastSession"));
		lastSaveDate = Date.now() - lastSaveDate;
		lastSaveDate = Math.round(lastSaveDate / 1000);
		if(lastSaveDate / 60 >= 1){
			clicker.nodes += lastSaveDate * rate / 1.8;
			document.querySelector("#achievements").innerHTML += `<br>While you were gone...<br>you drew ${numberformat.format(lastSaveDate*rate/1.8)} nodes!`;
		}
	}
	setInterval(() => {
		for(i in clicker.upgrades){
			clicker.nodes+=clicker.upgrades[i].amount*clicker.upgrades[i].rate/20;
		}
		for(i in clicker.achievements){
			var b = new Function('return '+clicker.achievements[i].req);
			if(b() && !clicker.achievements[i].gotten){
				clicker.achievements[i].gotten = true;
				document.querySelector("#achievements").innerHTML+=`
					<br>Achievement Get!<br>${clicker.achievements[i].text}<br>
				`;
			}
		}
		document.querySelector("#nodes").innerHTML = "You have " +numberformat.format( Number(String(clicker.nodes).split(".")[0])) + " nodes. (" + Number(String(clicker.nodes).split(".")[0]) + ")";
		document.querySelector("#nodeRate").innerHTML = "You are drawing " +numberformat.format( Number(String(rate))) + " nodes per second. (" + Number(String(rate)) + ")";
		for(i in clicker.upgrades){
			if(!clicker.upgrades[i].hasUn && clicker.upgrades[i].unlockAt <= clicker.nodes){
				clicker.upgrades[i].hasUn = true;
				update_upgrades();
			}
		}
		delay++;
		if(delay >= 40){
			Cookies.set("clicker",JSON.stringify(clicker), {expires: 42069});
			Cookies.set("lastSession", Date.now(), {expires: 42069});
			delay = 0;
		}
	},50);
}