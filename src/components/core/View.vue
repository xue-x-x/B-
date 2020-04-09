<template>
  <v-content class="v-content">
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view />
    </v-container>
  </v-content>
</template>
<style scoped>
  .v-content{
    padding-top: 0!important;
  }
</style>
