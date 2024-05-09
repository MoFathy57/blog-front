<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <h3 class="navbar-brand">Blog App</h3>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/Login" @click="logOut">Logout</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="post in posts" :key="post.id">
        <div
          class="w-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
        >
          <img :src="post.image" class="w-100 object-cover" height="300px" />
          <div class="p-4">
            <h2 class="my-1 text-xl font-bold leading-tight text-gray-800">{{ post.title }}</h2>
            <div class="flex items-center mt-2">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-380-456332.png"
                alt="Author Avatar"
                class="rounded-full"
                width="60px"
              />
              <p class="text-sm font-medium text-gray-600 ml-2">By Admin</p>
            </div>
            <time
              datetime="2023-03-13"
              class="text-sm uppercase font-semibold mt-1 text-gray-400"
              >{{ post.publish_date }}</time
            >
            <p class="text-sm mt-4 text-gray-700 text">
              {{ post.body }}
            </p>
            <RouterLink
              :to="'/post/' + post.id"
              class="mt-4 py-2 px-4 rounded-full font-medium border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition duration-300 inline-block"
              >Read more
              <i class="fas fa-arrow-right ml-1"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  data() {
    return {
      loading: false,
      posts: []
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push('/Login')
    }
    this.getPosts()
  },
  methods: {
    getPosts() {
      this.loading = true

      this.$store.dispatch('posts/getPosts').then(
        (data) => {
          this.posts = data.posts
        },
        (error) => {
          this.loading = false
          this.message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    },
    logOut() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/Login')
      })
    }
  }
}
</script>
<style scoped>
.text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 50px;
}
</style>
