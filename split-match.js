var Transform = require('stream').Transform;
var util = require("util");
var fileSystem = require("fs");
var program = require('commander');
var PatternMatch = function () {
	Transform.call(
		this,
		{	
			objectMode: true
		}
	);

}

util.inherits(PatternMatch, Transform);

PatternMatch.prototype._transform = function (chunk, encoding, getNextChunk) {
	console.log("Transform");
	var data = chunk.toString();
	if(this._lastLineData) data = this._lastLineData + data;
	console.log(program.pattern);	
	console.log(program.pattern2);
	var lines = data.split(program.pattern);
	var lines2 = [];
	var lines3 = [];
	lines.forEach(function (element, index, array) {
		lines2.push(element.split(program.pattern2).forEach(function (element, index, array) {
				lines3.push(element);
			})) 
		console.log(element);
	});
	this._lastLineData = lines.splice(lines2.length-1,1)[0];

	console.log(data)
	lines.forEach(this.push.bind(this));
	console.log(lines3);
};

PatternMatch.prototype._flush = function (flushCompleted) {

};

program
	.option('-p, --pattern <pattern>', 'Input Pattern such as . ,')
	.option('-s, --pattern2 <pattern2>', 'Input Pattern2 such as . ,')
	.parse(process.argv)
console.log(program.pattern);
console.log(program.pattern2);
var inputStream = fileSystem.createReadStream( './input-sensor.txt' );
var patternStream = inputStream.pipe( new PatternMatch());

patternStream.on('readable', function() {
});
