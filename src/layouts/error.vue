<template>
  <v-row class="align-self-center">
    <v-col class="text-center" cols="12">
      <h1>{{ message }}</h1>
      <nuxt-link to="/">Home page</nuxt-link>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types'
import { defineComponent, computed, useMeta } from 'nuxt-composition-api'

type Props = {
  error: NuxtError
}

export default defineComponent({
  props: {
    error: {
      type: Object,
    },
  },
  head: {},
  setup(props: Props) {
    const message = computed(() =>
      props.error.statusCode === 404 ? '404 Not Found' : 'An error occurred'
    )

    useMeta({
      title: message.value,
    })

    return {
      message,
    }
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
