<template>
  <v-data-table
    :headers="headers"
    :items="people"
    item-key="personId"
    :must-sort="true"
  >
    <template slot="items" slot-scope="person">
      <tr class="cursor--pointer" @click="editPerson(person.item.personId)">
        <td>{{person.item.firstName}}</td>
        <td>{{person.item.lastName}}</td>
        <td :class="getBooleanClass(person.item.isAuthorised)">{{person.item.isAuthorised | booleanToYesNo}}</td>
        <td :class="getBooleanClass(person.item.isValid)">{{person.item.isValid | booleanToYesNo}}</td>
        <td>{{person.item.favouriteColours | colourArrayToCommaSeparated}}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PeopleTable',
  mixins: [],
  props: {},
  data: () => ({
    headers: [
      {
        text: 'First name',
        value: 'firstName'
      },
      {
        text: 'Last name',
        value: 'lastName'
      },
      {
        text: 'Authorised',
        value: 'isAuthorised'
      },
      {
        text: 'Valid',
        value: 'isValid'
      },
      {
        text: 'Colours',
        value: 'favouriteColours',
        sortable: false
      }]
  }),
  computed: {
    ...mapState({
      people: state => state.people
    })
  },
  watch: {},
  methods: {
    ...mapActions([
      'getPeople'
    ]),
    getBooleanClass (value) {
      return value ? 'green--text' : 'red--text'
    },
    editPerson (personId) {
      this.$router.push({ path: `/person/${personId}` })
    }
  },
  mounted () {
    this.getPeople()
  },
  filters: {
    colourArrayToCommaSeparated (array) {
      return array.map(entry => (entry && entry.name) || 'None').join(', ')
    },
    booleanToYesNo (value) {
      return value ? 'Yes' : 'No'
    }
  }
}
</script>

<style scoped>

</style>
