
var alphabet = ['A', 'C', 'G', 'T'];
var n = 10;
var toMatch = "ATGC";

var total = Math.pow(alphabet.length, n);

console.log("Total strings");
console.log(total);

var counts = new Array(n+1);
for (var i = 0; i<=n; i++) {
  counts[i] = 0;
}

applyToEachString(alphabet, n, function(string) {
  counts[countMatches(string, toMatch)]++;
});

console.log("Exact match counts");
console.log(counts);

for (var i = 0; i<=n; i++) {
  for (var j = i+1; j<=n; j++) {
    counts[i] += counts[j];
  }
}

console.log("At least match counts");
console.log(counts);

for (var i = 0; i<=n; i++) {
  counts[i] /= total;
}

console.log("At least match prob");
console.log(counts);

function applyToEachString(alphabet, n, functionToApply) {

  function nextChar(partial) {
	if (partial.length < n) {
      for (var i = 0; i < alphabet.length; i++) {
        nextChar(partial + alphabet[i]);
      }
	} else {
	  functionToApply(partial);
    }
  }
  
  nextChar("");

}

function countMatches(string, toMatch) {
  var matchesInString = 0;
  var matchPosition = 0;
  while (matchPosition != -1) {
    matchPosition = string.indexOf(toMatch, matchPosition);
    if (matchPosition != -1) {
      matchesInString++;
      matchPosition++;
    }
  }
  return matchesInString;
}
