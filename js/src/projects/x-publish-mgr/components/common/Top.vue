<script>
import formSerialize from "form-serialize"
import SwitchSys from "projects/common/SwitchSys"
export default {
  props: ['leftName', 'title', 'currentPlant'],
  components:{SwitchSys}
}
</script>

<template lang="pug">
.div
	SwitchSys(:currentPlant='currentPlant')
</template>


<style lang="stylus" scoped>

</style>
