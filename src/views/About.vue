<template>
  <div>
    <div
      class="about-us-header"
      style='background-image: url("https://www.globalgiving.org/img/banners/hero_aboutus_lg.jpg");'
    >
      <h1>About Us</h1>
    </div>
    <div class="about-us-top-tittle">
      <p>
        CHARITY is a nonprofit that supports other nonprofits by connecting them
        to donors and companies. Since 2019, we've helped trusted, community-led
        organizations from Afghanistan to Zimbabwe (and hundreds of places in
        between) access the tools, training, and support they need to make our
        world a better place.
      </p>
    </div>
    <div class="statistics-container">
      <div class="statistics-content">
        <div class="left-section"></div>
        <div class="right-section">
          <img
            src="https://www.globalgiving.org/img/aboutus/About_overview_map_1024w.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.about-us-header {
  height: 25em;
  position: relative;
  background: no-repeat 50% 50%;
  background-size: cover;
  overflow: hidden;
  text-align: center;
  justify-content: center;
}
.about-us-header::before {
  content: " ";
  position: absolute;
  background: #293541;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.about-us-top-tittle {
  width: 50%;
  margin: auto;
}
.about-us-top-tittle p {
  font-family: Aleo, Georgia, serif;
  vertical-align: middle;
  line-height: 1.5;
  font-size: 1.3em;
  color: #32404e;
  font-style: normal;
  font-weight: 400;
  margin-top: 50px;
  margin-bottom: 50px;
}

h1 {
  color: white;
  z-index: 99999;
  height: 30px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.statistics-content {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: row;
}
.statistics-container {
  border-top: 1px solid #afb9c1;
  border-bottom: 1px solid #afb9c1;
  background: #ebeeee;
  text-align: center;
  justify-content: center;
}
.left-section,
.left-section {
  flex: 1;
}
</style>
