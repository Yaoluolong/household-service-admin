const table = {
  data() {
    return {
      begin: 0
    }
  },
  computed: {
    end() {
      return this.begin + 16
    }
  },
  methods: {
    pageChange(page) {
      this.begin = (page - 1) * 15
    }
  }
}
export default table
