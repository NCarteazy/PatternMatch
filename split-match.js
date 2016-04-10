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
	var data = chunk.toString();
	if(this._lastLineData) data = this._lastLineData + data;
		
	var lines = data.split(program.pattern);
	var lines2 = [];
	var lines3 = [];
	if(program.pattern2 != null) {
		lines.forEach(function (element, index, array) {
			lines2.push(element.split(program.pattern2).forEach(function (element, index, array) {
					lines3.push(element);
				})) 
		});
	lines = lines3;
	}
	this._lastLineData = lines.splice(lines.length-1,1)[0];
	lines.forEach(this.push.bind(this));
	console.log("---------------------INPUT----------------------------");
	console.log(data);
	console.log("---------------------OUTPUT---------------------------");
	console.log(lines);
};

PatternMatch.prototype._flush = function (flushCompleted) {
	if(this._lastlineData) this.push(this._lastLineData)
	this._lastLineData = null
	flushCompleted()
};

program
	.option('-p, --pattern <pattern>', 'Input Pattern such as . ,')
	.option('-s, --pattern2 <pattern2>', 'Input Pattern2 such as . ,')
	.parse(process.argv)
var inputStream = fileSystem.createReadStream( './input-sensor.txt' );
var patternStream = inputStream.pipe( new PatternMatch());

patternStream.on('readable', function() {
});
