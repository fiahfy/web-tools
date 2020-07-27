<template>
  <v-row>
    <v-col cols="12">
      <h1>my-decoder</h1>
      <v-textarea
        v-model="state.input"
        name="input"
        label="Input"
        :hint="state.hint"
        :error="state.error"
        class="my-3"
      />
      <v-textarea
        v-model="state.output"
        name="output"
        label="Output"
        readonly
        class="my-3"
        placeholder="No data"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      input: '',
      output: '',
      hint: '',
      error: false,
    })

    watch(
      () => state.input,
      (input) => {
        let encoded = input
        // remove leading/trailing quotes
        encoded = encoded.replace(/^["']/g, '').replace(/["']$/g, '')

        let decoded = ''
        try {
          switch (true) {
            // \u304a\u306b\u304e\u308a -> おにぎり
            case !!encoded.match(/^(\\u[0-9a-f]{4})+$/):
              state.hint = 'Unicode'
              /* eslint-disable-next-line no-eval */
              decoded = eval("'" + encoded + "'")
              break
            // \U304a\U306b\U304e\U308a -> おにぎり
            case !!encoded.match(/^(\\U[0-9a-f]{4})+$/):
              state.hint = 'Unicode'
              encoded = encoded.replace(/U/g, 'u')
              /* eslint-disable-next-line no-eval */
              decoded = eval("'" + encoded + "'")
              break
            // %E3%81%8A%E3%81%AB%E3%81%8E%E3%82%8A -> おにぎり
            case !!encoded.match(/^(%[0-9a-f]{2})+$/i):
              state.hint = 'URI encoded'
              decoded = decodeURIComponent(encoded)
              break
            // \xE3\x81\x8A\xE3\x81\xAB\xE3\x81\x8E\xE3\x82\x8A -> おにぎり
            case !!encoded.match(/^(\\x[0-9a-f]{2})+$/i):
              state.hint = 'URI encoded'
              encoded = encoded.replace(/\\x/g, '%')
              decoded = decodeURIComponent(encoded)
              break
            default:
              throw new Error('Invalid format')
          }
          state.output = decoded
          state.error = false
          state.hint = 'Detected: ' + state.hint
        } catch (e) {
          state.output = ''
          state.error = true
          state.hint = e.message
        }
      }
    )

    return {
      state,
    }
  },
})
</script>
