<template>
  <v-app-bar v-if="$vuetify.breakpoint.smAndUp" app
             clipped-left
             color="blue-grey darken-4" dark>
    <logo>
      <v-btn :to="campRoute(camp(), 'program')" class="justify-start px-2 camp--name"
             text
             width="216">
        <v-toolbar-title>
          {{ camp().title | loading($tc('views.camp.navigationCamp.campIsLoading')) }}
        </v-toolbar-title>
      </v-btn>
    </logo>

    <v-toolbar-items>
      <v-btn :to="campRoute(camp(), 'collaborators')" text>
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-account-group</v-icon>
        <span class="sr-only-sm-and-down">{{ $tc('views.camp.navigationCamp.team') }}</span>
      </v-btn>
      <v-btn :to="campRoute(camp(), 'admin')" text>
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-cogs</v-icon>
        <span class="sr-only-sm-and-down">{{ $tc('views.camp.navigationCamp.admin') }}</span>
      </v-btn>
      <v-btn :to="campRoute(camp(), 'print')" text>
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-printer</v-icon>
        <span class="sr-only-sm-and-down">{{ $tc('views.camp.navigationCamp.print') }}</span>
      </v-btn>
      <v-btn :to="campRoute(camp(), 'story')" text>
        <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-book-open-page-variant</v-icon>
        <span class="sr-only-sm-and-down">{{ $tc('views.camp.navigationCamp.story') }}</span>
      </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <search-desktop />
    <user-meta />
  </v-app-bar>
  <v-bottom-navigation v-else app
                       fixed grow>
    <v-btn>
      <span>{{ $tc('views.camp.navigationCamp.material') }}</span>
      <v-icon>mdi-package-variant</v-icon>
    </v-btn>
    <v-btn>
      <span>{{ $tc('views.camp.navigationCamp.tasks') }}</span>
      <v-icon>mdi-format-list-checks</v-icon>
    </v-btn>
    <v-btn :to="{name: 'camp/program'}">
      <span>{{ $tc('views.camp.navigationCamp.camp') }}</span>
      <v-icon large>mdi-tent</v-icon>
    </v-btn>
    <v-btn :to="{name: 'camp/collaborators'}" exact>
      <span>{{ $tc('views.camp.navigationCamp.team') }}</span>
      <v-icon>mdi-account-group</v-icon>
    </v-btn>
    <v-btn :to="{name: 'camp/admin'}">
      <span>{{ $tc('views.camp.navigationCamp.admin') }}</span>
      <v-icon>mdi-cogs</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { campRoute } from '@/router'
import SearchDesktop from '@/components/navigation/SearchDesktop'
import UserMeta from '@/components/navigation/UserMeta'
import Logo from '@/components/navigation/Logo'

export default {
  name: 'NavigationCamp',
  components: {
    UserMeta,
    SearchDesktop,
    Logo
  },
  props: {
    camp: { type: Function, required: true }
  },
  methods: {
    campRoute
  }
}
</script>

<style lang="scss" scoped>
  .camp--name::v-deep .v-btn__content {
    width: 100%;
  }
</style>
