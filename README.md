# test-nino

The fastest UK National Insurance number generator.

# How fast can it be?


* https://www.npmjs.com/package/fake-nino
* https://www.npmjs.com/package/random_uk_nino


## What makes it fast?
Other packages out there use loops which go through the process of `Generate random NINO > is it valid? > no > repeat`, until a valid nino is given.

This can mean that precious CPU resources and the Node Event Loop is being blocked.

`test-nino` has been made a lot simpler and just stores a the complete list of valid prefixes and suffixes which are then just looked up at random. No loops, so this gives us big-O of O(1) vs O(?)