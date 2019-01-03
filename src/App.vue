<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase cursor--pointer" @click="$router.push('/')">
        <span>Colours</span>
        <span class="font-weight-light"> test</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="pink--text text--accent-3">mdi-duck</v-icon>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
<style>
  .cursor--pointer {
    cursor: pointer;
  }
</style>
