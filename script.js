var songList, x, speed = 10,
    angle = 1,
    paused = !1,
    file = "https://cdn.glitch.com/28317d3e-f139-4c15-ae4b-a13ac84de942%2F",
    v = ".mp3?v=1632077873680";
var str = window.location.href
fetch(str.substring(0, str.lastIndexOf("/")) + "/songs.txt").then(e => e.text()).then(e => {
    console.log(e.split("\n")), songList = e.split("\n"), setTimeout(function() {
        x = new Audio(randomChoice(songList))
    }, 1e3)
}), console.log(x);
var l, lastSong, oldSongs = [];

function randomChoice(e) {
    var t = Math.floor(Math.random() * e.length - 1);
    if (console.log(oldSongs), oldSongs[t] != lastSong) {
        if (oldSongs[t] < 2) return oldSongs[t] = oldSongs[t] + 1, e[t];
        t = Math.floor(Math.random() * e.length);
        return oldSongs[t] = oldSongs[t] + 1, lastSong = oldSongs[t], encodeURI(e[t])
    }
    setTimeout(skip, 1e3), console.log("a song was played twice so it was skipped")
}

function playAudio() {
    document.getElementsByTagName("IMG")[2].style.display = "none", document.getElementsByTagName("IMG")[3].style.display = "inline";
    try {
        setTimeout(function() {
            x.play(), x.volume = document.getElementById("volume-control").valueAsNumber / 100
        }, 30), l = setInterval(function() {
            animation()
        }, speed)
    } catch (e) {
        setTimeout(function() {
            null == x.src ? location.reload : x.play()
        }, 30), l = setInterval(function() {
            animation()
        }, speed)
    } finally {
        setTimeout(function() {
            title()
        }, 100)
    }
}

function pauseAudio() {
    document.getElementsByTagName("IMG")[2].style.display = "inline", document.getElementsByTagName("IMG")[3].style.display = "none", x.pause(), clearInterval(l)
}
var pastSongs = [];

function skip() {
    songNum += 1, pauseAudio(), pastSongs.push(title("returning")), x = randomChoice(songList), (x = new Audio(x)).id = "x", setTimeout(function() {
        playAudio()
    }, 500), x.addEventListener("ended", function() {
        skip()
    })
}
var songNum = 0;

function goBack() {
    pauseAudio(), x = new Audio(query(pastSongs[songNum - 1])), setTimeout(function() {
        title()
    }, 50), playAudio()
}

function onload() {
    window.onClick = setInterval(function() {
        if (x.currentTime == x.duration) {
            skip()
        }
    }, 4000);;
    setTimeout(function() {
        var e = document.querySelector("link[rel*='icon']") || document.createElement("link");
        e.type = "image/x-icon", e.rel = "shortcut icon", e.href = "https://cdn.glitch.com/28317d3e-f139-4c15-ae4b-a13ac84de942%2FmilkyChance.PNG?v=1632077943086", document.getElementsByTagName("head")[0].appendChild(e), document.getElementById("volume-control").addEventListener("input", function(e) {
            x.volume = e.currentTarget.value / 100
        });
        for (var t = 0; t < songList.length - 1; t++) oldSongs.push(0);
        window.onbeforeunload = closingCode
    }, 1e3)
}

function animation() {
    document.getElementById("cd").style.transform = "rotate(" + angle % 360 + "deg)", document.getElementById("cd").style.margin = document.getElementById("cd").width / 2 * -1 + "px 0 0 " + document.getElementById("cd").width / 2 * -1 + "px", angle += .5
}

function title(e = 0) {
    var t = (t = x.src.substring(x.src.lastIndexOf("/") + 1)).split("%2F").pop(),
        n = decodeURI(t).split(".mp3");
    if (n.pop(1), "Nobody Knows" == n && (x.volume = 1, document.getElementById("volume-control").value = 100), 0 != e) return n[0];
    document.getElementById("title").innerHTML = n, document.title = n
}

function query(e) {
    return file + encodeURI(e).toString() + v
}

function closingCode() {
    return setCookie("currentSong", x.src, 7), setCookie("currentTime", Math.round(x.currentTime) - 1, 7), setCookie("volume", document.getElementById("volume-control").valueAsNumber, 7), null
}

function playOld() {
    document.getElementById("volume-control").value = 100 * getCookie("volume"), x.src = getCookie("currentSong"), x.volume = document.getElementById("volume-control").value / 100, x.currentTime = getCookie("currentTime"), x.play(), setTimeout(function() {
        title()
    }, 100)
}

function setCookie(e, t, n) {
    var o = "";
    if (n) {
        var i = new Date;
        i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3), o = "; expires=" + i.toUTCString()
    }
    document.cookie = e + "=" + (t || "") + o + "; path=/"
}

function getCookie(e) {
    for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), o = 0; o < n.length; o++) {
        for (var i = n[o];
            " " == i.charAt(0);) i = i.substring(1);
        if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
    }
    return ""
}! function() {
    var e, t = document.body,
        n = (e = 0, function() {
            0 === e && "" != document.cookie && (setTimeout(function() {
                x.pause(), playOld()
            }, 10), event.preventDefault()), e++
        });
    t.addEventListener("click", n, !1)
}(), document.onkeydown = keydown;
paused = !1;

function keydown(e) {
    e || (e = event), 39 == e.keyCode && (e.preventDefault(), x.currentTime += 10), 37 == e.keyCode && (e.preventDefault(), x.currentTime -= 10), 13 == e.keyCode && (e.preventDefault(), skip()), 32 == e.keyCode && (e.preventDefault(), 0 == paused ? (x.pause(), paused = !0) : (x.play(), paused = !1))
}

function onSubmit(e) {
    return !!document.getElementById(e).value.mp3
}
