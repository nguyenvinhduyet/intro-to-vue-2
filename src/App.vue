<template>
  <v-app>

<!-- App bar component -->
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Vuetify Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded v-for="link in links" :to='link.url' :key='`${link.label}-header-link`'>{{ link.label }}</v-btn>
  </v-app-bar>


   <v-content>  <!-- v-content dùng để chỉ định phần tử bên trong có relative với phần tử gốc (app bar) tránh bị app bar đè lên -->
    <!-- login form -->
    <router-view></router-view>
  </v-content>


<!-- Footer component -->
<v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters>
      <v-btn
        v-for="link in links"
        :key='`${link.label}-footer-link`'
        color="white" 
        text  
        rounded
        class="my-2"
        :to='link.url'>
        {{ link.label }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify Dashboard</strong>
      </v-col>
    </v-row>
  </v-footer>

  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    showPassword: false,
    links: [
      {
        label: 'Home',
        url: '/'
      },
      {
        label: 'Login',
        url: '/login'
      },
      {
        label: 'Dashboard',
        url: '/dashboard'
      }
    ]
  }),
};
</script>
