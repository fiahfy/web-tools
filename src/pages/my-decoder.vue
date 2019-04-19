<template>
  <v-layout justify-center>
    <v-flex xs12>
      <h1>my-decoder</h1>
      <v-textarea
        v-model="input"
        name="input"
        label="Input"
        :hint="hint"
        :error="error"
        class="my-3"
      />
      <v-textarea
        v-model="output"
        name="output"
        label="Output"
        readonly
        class="my-3"
        placeholder="No data"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      output: '',
      hint: '',
      error: false
    }
  },
  watch: {
    input(value) {
      let encoded = value
      // remove leading/trailing quotes
      encoded = encoded.replace(/^["']/g, '').replace(/["']$/g, '')

      let decoded = ''
      try {
        switch (true) {
          // \u304a\u306b\u304e\u308a -> おにぎり
          case !!encoded.match(/^(\\u[0-9a-f]{4})+$/):
            this.hint = 'Unicode'
            /* eslint-disable-next-line no-eval */
            decoded = eval("'" + encoded + "'")
            break
          // \U304a\U306b\U304e\U308a -> おにぎり
          case !!encoded.match(/^(\\U[0-9a-f]{4})+$/):
            this.hint = 'Unicode'
            encoded = encoded.replace(/U/g, 'u')
            /* eslint-disable-next-line no-eval */
            decoded = eval("'" + encoded + "'")
            break
          // %E3%81%8A%E3%81%AB%E3%81%8E%E3%82%8A -> おにぎり
          case !!encoded.match(/^(%[0-9a-f]{2})+$/i):
            this.hint = 'URI encoded'
            decoded = decodeURIComponent(encoded)
            break
          // \xE3\x81\x8A\xE3\x81\xAB\xE3\x81\x8E\xE3\x82\x8A -> おにぎり
          case !!encoded.match(/^(\\x[0-9a-f]{2})+$/i):
            this.hint = 'URI encoded'
            encoded = encoded.replace(/\\x/g, '%')
            decoded = decodeURIComponent(encoded)
            break
          default:
            throw new Error('Invalid format')
        }
        this.output = decoded
        this.error = false
        this.hint = 'Detected: ' + this.hint
      } catch (e) {
        this.output = ''
        this.error = true
        this.hint = e.message
      }
    }
  }
}
</script>
