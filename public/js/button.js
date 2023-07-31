var count = 0;
var thumbsUp = document.getElementById("thumbsUp");
var thumbsDown = document.getElementById("thumbsDown")
var countDisplay = document.getElementById("count");
thumbsUp.addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
})
thumbsDown.addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
})