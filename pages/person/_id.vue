<template>
  <main class="page page--person person">
    <!-- <h1 class="page__title">Страница о человеке</h1> -->
    <nuxt-link to="/search" class="page__link page__link--back">
      Назад к поиску
    </nuxt-link>
    <template v-if="currentPerson">
      <!-- <h1>Личное дело №{{ personalNumber }}: {{ currentPerson.name }}</h1>
      <p>{{ currentPerson.bio }}</p> -->
      <section class="person__profile profile">
        <div class="profile__col profile__col--first">
          <h1 class="profile__name">{{ currentPerson.name }}</h1>
          <p class="profile__bio">{{ currentPerson.bio }}</p>
        </div>
        <div class="profile__col profile__col--last">
          <ul class="profile__info">
            <li class="profile__info-part">
              Год рождения: {{ currentPerson.birthday }}
            </li>
            <li class="profile__info-part">
              Дата смерти: {{ currentPersonDeathDate }}
            </li>
          </ul>
          <img
            :src="`/kommunarka-app/media/${currentPerson.img}`"
            :alt="currentPerson.title"
            class="profile__img img-responsive"
          />
        </div>
      </section>
    </template>
    <template v-else>
      <h1>Личное дело №0: неизвестный</h1>
      <p>Неизвестный погибший...</p>
    </template>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  // asyncData({route, store, params, query) {
  //   const loadedVictim = await this.$content('victims')
  //     .where
  // },
  async fetch() {
    console.log('fetch called!')
    if (!this.currentPerson) {
      console.log(
        `no person data loaded, making an API call where ID: ${this.id}`
      )
      const loadedVictims = await this.$content('victims')
        // .where({ id: { $eq: this.id } })
        .where({ id: this.id })
        .fetch()
      console.log('loaded victim in arr:', loadedVictims)
      if (loadedVictims.length) {
        const victimObj = loadedVictims[0]
        console.log('victimObj:', victimObj)
        const victimGroup = victimObj.name.charAt(0).toLowerCase()
        console.log('victimGroup:', victimGroup)
        if (!this.victims[victimGroup])
          this.setVictimsGroup([victimGroup, [victimObj]])
        else this.setVictim([victimGroup, victimObj])
        // MEMO: load all group in case going back to search!
        const allVictimsGroup = await this.$content('victims')
          .where({ slug: victimGroup })
          .fetch()
        this.setVictimsGroup([victimGroup, allVictimsGroup])
      } else console.warn('Victim not found in API!')
    }
  },
  data() {
    return {
      victim: {
        name: '',
        birthday: '',
        bio: '',
        death: '',
        img: '',
        title: '',
      },
    }
  },
  computed: {
    ...mapState('victims', ['victims']),
    allVictims() {
      return this.victims.all
    },
    id() {
      return parseInt(this.$route.params.id)
    },
    personalNumber() {
      return this.id + 1
    },
    currentPerson() {
      return this.allVictims.find((v) => v.id === this.id)
    },
    currentPersonDeathDate() {
      return this.currentPerson.death
        .split('/')
        .map((d, i, arr) => {
          if (i === arr.length - 1) return '19' + d
          return d
        })
        .join('.')
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  head() {
    return {
      title: 'личное дело #' + this.personalNumber,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Личное дело #' + this.personalNumber,
        },
      ],
    }
  },
  methods: {
    ...mapActions('victims', ['setVictim', 'setVictimsGroup']),
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name === 'search') {
  //     this.content
  //   }
  // },
}
</script>

<style lang="stylus">
@import '~assets/stylus/variables'
@import '~assets/stylus/page'

  .person
    background-color: $black

  .person__profile // section.profile
    //

  .profile // section.person__profile
    display: flex
    flex-flow: row wrap
    align-items: flex-start
    justify-content: space-between
    width: 100%
    // margin-left: - $rw_unitX1_5
    // margin-right: - $rw_unitX1_5

  .profile__col
    display: flex
    flex-flow: column wrap
    flex-grow: 1
    flex-basis: 50%
    align-items: stretch
    width: 50%
    padding: $rh_unitX1_5 $rw_unitX1_5

  .profile__col--first
    padding-left: 0

  .profile__col--last
    padding-right: 0

  .profile__name // h1
    font-family: $f_garamond
    font-size: 3.75rem // 60px
    font-weight: 200
    line-height: 1
    margin: 0
    margin-bottom: $rh_unitX2

  .profile__bio
    font-family: $f_garamond
    font-size: 1.875rem // 30px
    line-height: 1.2    // 36px
    flex-basis: 75%

  .profile__info // ul
    font-family: $f_mono
    font-size: 1.875rem // 30px
    line-height: 1.2    // 36px
    list-style: none
    text-align: right
    margin-bottom: $rh_unitX3

  .profile__info-part
    //
</style>
