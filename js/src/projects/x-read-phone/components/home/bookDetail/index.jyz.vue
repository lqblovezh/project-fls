<script>
export default {
  created() {
    this.$router.replace({
      path: '/bookMedia',
      query: {
        type: 'Read',
        ...this.$route.query,
      },
    })
    // this.$go('/bookMedia', { ...this.$route.query, type: 'Read' })
  },
}
</script>
