<template>
  <div class="header">
    <img
      style="width: 200px;"
      src="http://www.nicdarkthemes.com/themes/charity/wp/demo/charity-foundation-polaroid/wp-content/uploads/sites/9/2017/05/logo-grey.png"
      alt=""
    />
    <nav>
      <a href="/">Home</a>
      <a href="/privacy">Privacy</a>
      <a href="/about">About</a>
      <a href="/contact">Contact Us</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      dialog: false,
      nav: [
        {
          icon: "home",
          text: "Home",
          title: "Back to Home page",
          active: true,
        },
        {
          icon: "info",
          text: "About",
          title: "About this demo",
          active: false,
        },
        {
          icon: "assignment_turned_in",
          text: "Todos",
          title: "Some stuff that needs doing",
          active: false,
        },
        {
          icon: "email",
          text: "Contact",
          title: "Our Contact info",
          active: false,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.header img {
  margin-top: 20px;
}

a {
  text-decoration: none;
  color: #333;
}

nav {
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

nav a {
  flex-grow: 1;
  text-align: center;
  padding: 1em;
  position: relative;
  color: #1a1a1a;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

nav a:hover {
  text-decoration: none !important;
}

nav a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  transform: scaleX(0);
  background: #333;
  transition: 0.7s transform cubic-bezier(0.06, 0.9, 0.28, 1);
  text-decoration: none;
}

nav a:hover::after {
  transform: scaleX(1);
}
</style>
