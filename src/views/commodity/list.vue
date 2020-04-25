<template>
  <div class="app-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="(item,index) in classes" :key="index" :title="item.label" :name="index">
        <item-card :cards="item.values" @on-remove="update" @on-edit="update" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { queryClass } from '@/api/class'
import { list } from '@/api/commodity'
import ItemCard from './components/ItemCard'

export default {
  name: 'List',
  components: { ItemCard },
  data() {
    return {
      activeNames: ['1'],
      classes: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    update() {
      this.$nextTick(_ => {
        this.fetchData()
      })
    },
    fetchData() {
      queryClass().then(response => {
        this.classes = response.data.map(obj => {
          return { label: obj.className, values: [] }
        })
        list().then(response => {
          this.classes.forEach(i => {
            if (Array.isArray(response.data)) {
              i.values = response.data.filter(j => {
                return j.className === i.label
              })
            } else {
              i.values = [response.data].filter(j => {
                return j.className === i.label
              })
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleChange(val) {
    }
  }
}
</script>

<style>

</style>

