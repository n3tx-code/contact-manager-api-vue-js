<template>
  <div id="app">
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
body, html
{
  background: #f0f0f0;
  font-family: 'Montserrat', sans-serif;
  padding-bottom: 20px;
}
.row
{
  margin-left: 0;
  margin-right: 0; 
}
#app {
  margin-top : 20px;
}
.btn-contact-manager
{
  background-color: #0db0d3;
  color : #fff;
}
.btn-contact-manager:hover
{
  background-color: #9c32fe;
  box-shadow: 0px 0px 5px #333;
  color : #fff;
}

</style>
