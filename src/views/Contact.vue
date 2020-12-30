<template>
  <div
    class="contact-cont"
    style='background-image: url("https://www.globalgiving.org/img/banners/hero_aboutus_lg.jpg");'
  >
    <h1>Contact Us</h1>
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
.contact-cont {
  height: 25em;
  position: relative;
  background: no-repeat 50% 50%;
  background-size: cover;
  overflow: hidden;
  text-align: center;
  justify-content: center;
}
.contact-cont::before {
  content: " ";
  position: absolute;
  background: #293541;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
</style>
