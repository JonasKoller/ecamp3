<template>
  <div class="mb-3">
    <api-form :entity="activityContent.singleText()">
      <api-textarea
        fieldname="text"
        :label="$tc('activityContent.notes.name')"
        rows="4"
        auto-grow />
    </api-form>
  </div>
</template>

<script>

import ApiTextarea from '@/components/form/api/ApiTextarea'
import ApiForm from '@/components/form/api/ApiForm'

export default {
  name: 'Notes',
  components: {
    ApiForm,
    ApiTextarea
  },
  props: {
    activityContent: { type: Object, required: true }
  }
}
</script>

<style scoped>
</style>
