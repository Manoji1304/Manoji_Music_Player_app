new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "🤩 Kaavaala Song 😍",
          artist: "Jailer😎",
          cover: "../img/1.jpg",
          source: "../mp3/1.mp3",
          url: "https://youtu.be/RVLNBVK8auM?si=Buf1tnsK0HAbBa4r",
          favorited: false
        },
        {
          name: "💖 Aradhya Song 💞",
          artist: "Kushi💘",
          cover: "../img/2.png",
          source: "../mp3/2.mp3",
          url: "https://youtu.be/xqOdFnB0b6s?si=TAlBqJS7I7gMCrq7",
          favorited: true
        },

        {
          name: "♌ Naa Ready 🔥",
          artist: "🦁LEO🐆",
          cover: "../img/3.jpg",
          source: "../mp3/3.mp3",
          url: "https://youtu.be/szvt1vD0Uug?si=7sgbWirDoQCOTmzP",
          favorited: false
        },

        {
          name: "💏Hayyoda Song🥰",
          artist: "😇Jawan✨",
          cover: "../img/4.png",
          source: "../mp3/4.mp3",
          url: "https://youtu.be/8eYG5QGZAZs?si=Dv3daAeB6m_BqBOO",
          favorited: false
        },
        {
          name: "🌹Butta Bomma💫",
          artist: "🥳Ala Vaikunthapurramuloo🤩",
          cover: "../img/5.jpg",
          source: "../mp3/5.mp3",
          url: "https://youtu.be/2mDCVzruYzQ?si=ZrwGxrLLW1orbpif",
          favorited: true
        },
        {
          name: "😍Ranjithame Ranjithame🥰",
          artist: "🔥Varisu💥",
          cover: "../img/6.jpg",
          source: "../mp3/6.mp3",
          url: "https://youtu.be/unQlCp-lL6I?si=X9L4-zTSPttqhzMB",
          favorited: false
        },
        {
          name: "♨️Oo Solriya Oo Oo Solriya🥵",
          artist: "🧔‍♂️Pushpa: The Rise - Part 1💢",
          cover: "../img/7.jpg",
          source: "../mp3/7.mp3",
          url: "https://youtu.be/w78XpGt-IPQ?si=k7NNiWExxhAgAMKY",
          favorited: true
        },
        {
          name: "❤️Munbe Vaa💟",
          artist: "❣️Sillunu Oru Kaadhal💯💕",
          cover: "../img/8.jpeg",
          source: "../mp3/8.mp3",
          url: "https://youtu.be/UPQZ4vuvW2s?si=xbOdyvi3OJo56y8T",
          favorited: false
        },
        {
          name: "😈Beast Mode👿",
          artist: "🔥Beast🎇",
          cover: "../img/9.jpg",
          source: "../mp3/9.mp3",
          url: "https://youtu.be/Fyj5wbzRPC8?si=gZbmZLWPdn25ETru",
          favorited: false
        },
        {
          name: "❤️Megham Karukatha💟",
          artist: "❣️Thiruchitrambalam💕",
          cover: "../img/22.jpg",
          source: "../mp3/22.mp3",
          url: "https://youtu.be/cEWwJxEq9Lg?si=WPZk1w-tmx9mcnTT",
          favorited: false
        },
        {
          name: "🍺Bekhayali mein bhi tera hi khayal aaye🥂",
          artist: "🍾🥃Kabir Singh💕",
          cover: "../img/23.jpg",
          source: "../mp3/23.mp3",
          url: "https://youtu.be/VOLKJJvfAbg?si=vdnx--hoJDtkachl",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
