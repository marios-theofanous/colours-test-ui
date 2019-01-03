<template>
  <v-container>
    <v-card>
      <v-form v-model="valid">
        <v-container
          grid-list-xl
          fluid>
          <h1>Update {{person.firstName}} {{person.lastName}}</h1>
          <v-layout wrap>
            <v-flex xs12>
              <h2>User Details</h2>
            </v-flex>
            <v-flex
              xs12 md6
            >
              <v-text-field
                label="First name"
                v-model="person.firstName"></v-text-field>
            </v-flex>
            <v-flex
              xs12 md6
            >
              <v-text-field
                label="Last name"
                v-model="person.lastName"></v-text-field>
            </v-flex>
            <v-flex
              xs12 md6>
              <v-switch
                label="Authorised"
                color="green"
                v-model="person.isAuthorised"
              ></v-switch>
            </v-flex>
            <v-flex
              xs12 md6>
              <v-switch
                label="Valid"
                color="green"
                v-model="person.isValid"
              ></v-switch>
            </v-flex>
            <v-flex xs12>
              <h2>Favourite Colours</h2>
            </v-flex>
            <v-flex v-for="colour in colours"
                    :key="colour.colourId"
                    xs12 md6>
              <v-switch
                :label="colour.name"
                :color="colour.name.toLowerCase()"
                v-model="colour.isEnabled"
              ></v-switch>
            </v-flex>
            <v-flex xs12 pa-0>
              <v-btn @click="save(person)" color="primary">
                <v-icon left>mdi-content-save</v-icon>
                Save
              </v-btn>
              <v-btn to="/">Back</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'PeopleEdit',
    mixins: [],
    props: {},
    data () {
      return {
        person: {},
        valid: false
      }
    },
    computed: {
      ...mapState({
        colours: state => state.colours
      })
    },
    watch: {},
    methods: {
      ...mapActions(['getPerson', 'savePerson']),
      save (person) {
        this.savePerson(person)
          .then(res => {
            this.$router.push('/')
          })
      }
    },
    mounted () {
      this.getPerson(this.$route.params.id)
        .then(res => {
          this.person = res.data
        })
    }
  }
</script>

<style scoped>

</style>
