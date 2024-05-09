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
      <div
        v-if="post != null"
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
          <time datetime="2023-03-13" class="text-sm uppercase font-semibold mt-1 text-gray-400">{{
            post.publish_date
          }}</time>
          <p class="text-sm mt-4 text-gray-700 text">
            {{ post.body }}
          </p>
        </div>
      </div>
      <div v-if="message != null" class="alert alert-default">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComponent',
  data() {
    return {
      loading: false,
      post: null
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
    this.getPost()
  },
  methods: {
    getPost() {
      this.loading = true
      let id = this.$route.params.id
      this.$store.dispatch('posts/getPost', id).then(
        (data) => {
          console.log('post page', data)
          this.post = this.$store.state.posts.post
          if (this.post == null) {
            this.$router.push('/page-not-found')
          }
          this.loading = false
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
