<script setup>
import RotaingLink from "@/components/buttons/RotaingLink.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { ref, onMounted, computed } from "vue";

const posts = ref([]);
const searchText = ref("");
const activePost = ref(null);

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const truncateText = (text, length = 200) => {
  return text.length > length ? text.slice(0, length) + "…" : text;
};

const cleanImageStyles = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("img").forEach((img) => {
    img.removeAttribute("style"); // Removes inline style
    img.style.width = "100%"; // Optional: force full width
    img.style.height = "auto"; // Optional: reset height
  });
  return doc.body.innerHTML;
};

const getImageFromContent = (html) => {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match
    ? match[1]
    : "https://rakeshkanna-rk.github.io/database/img/img_placeholder.png";
};

onMounted(async () => {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rakeshkanna0108`
  );
  const data = await res.json();
  posts.value = data.items.map((post) => ({
    title: post.title,
    link: post.link,
    rawDescription: post.description,
    description: truncateText(stripHtml(post.description), 100),
    content: cleanImageStyles(post.content),
    categories: post.categories || [],
    thumbnail: getImageFromContent(post.content),
  }));
});

const filteredPosts = computed(() => {
  const query = searchText.value.toLowerCase();
  return posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.categories.some((cat) => cat.toLowerCase().includes(query))
  );
});

const openPost = (post) => (activePost.value = post);
const closePost = () => (activePost.value = null);
</script>

<template>
  <img
    src="@/assets/bg/sidelight-bg.avif"
    class="bg-img"
    id="desktop-bg"
    alt="background image"
    fetchpriority="high"
    loading="lazy"
  />
  <img
    src="@/assets/bg/mobi-sidelight-bg.avif"
    class="bg-img"
    id="mobile-bg"
    alt="background image"
    fetchpriority="high"
    loading="lazy"
  />

  <SectionHeader
    :subheading="'BLOG SPACE'"
    :mainHeading="'Fresh'"
    :shimmerText="'Reads'"
  />

  <div class="blog-container">
    <input
      v-model="searchText"
      placeholder="🔍 Search posts..."
      class="search-input"
      type="text"
    />
    <div class="card-list">
      <div class="blog-card" v-for="post in filteredPosts" :key="post.link">
        <img :src="post.thumbnail" alt="Post image" />
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <div class="tags">
          <span v-for="tag in post.categories" :key="tag" class="tag">{{
            tag
          }}</span>
        </div>
        <div class="actions">
          <div class="button-wrapper">
            <button class="rotating-button" @click="openPost(post)">
              Read here
            </button>
          </div>
          <RotaingLink
            :link="post.link"
            text="Visit Medium"
            target="_blank"
            rel="noopener"
          />
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="activePost" class="overlay">
      <div class="modal">
        <button class="close-btn" @click="closePost">×</button>
        <h2>{{ activePost.title }}</h2>
        <div v-html="activePost.content" class="content" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  font-family: var(--primary-font);
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px 50px 20px;
}

.search-input {
  width: 100%;
  all: unset;
  font-family: var(--primary-font);
  font-size: var(--h2);
  color: var(--white-color);
  background: var(--glass-color-03);
  backdrop-filter: blur(6.5px);
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 15px;
  cursor: pointer;
}

.search-input:focus {
  outline: none;
  border-color: var(--blue-color);
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 20px;
}

.blog-card {
  max-width: 500px;
  padding: 2rem;
  border-radius: 1.25rem;
  background: var(--glass-color-02, rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--white-color);
  font-family: var(--primary-font);
}
@media screen and (max-width: 600px) {
  .blog-card {
    padding: 1rem;
  }
}

.blog-card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-card p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.25;
}

.blog-card img {
  width: 100%;
  border-radius: 0.75rem;
  object-fit: cover;
  margin-bottom: 1rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 0.5rem;
  background: var(--glass-color-03);
  border: 0.1px solid #ffffff3e;
  white-space: nowrap;
  list-style-type: none;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1rem;
}

.button-wrapper {
  position: relative;
  display: inline-flex;
  padding: 2px;
  border-radius: 0.5rem;
  z-index: 0;
  overflow: hidden;
  justify-content: start;
  align-items: center;
}

.button-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: conic-gradient(
    from 0deg,
    rgba(255, 0, 170, 1),
    rgba(255, 77, 64, 1),
    rgba(204, 79, 92, 1),
    rgba(115, 0, 255, 1),
    rgba(255, 0, 170, 1)
  );
  animation: rotateGradient 4s linear infinite;
  border-radius: inherit;
}

.rotating-button {
  padding: 0.5rem 1rem;
  background: #111;
  color: var(--white-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  z-index: 1;
  position: relative;
  font-size: calc(var(--h3) - 3px);
}

@keyframes rotateGradient {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 601px) {
  .search-input {
    font-size: var(--h3);
    width: 80%;
    text-align: center;
  }
}

/* .blog-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px 50px 20px;
  gap: 20px;
} */

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: end;
  z-index: 1000;
  width: 100%;
}

.modal {
  width: 100%;
  max-height: 85vh;
  overflow-y: hidden;
  padding: 2rem;
  background: #111;
  border-radius: 20px 20px 0 0;
  color: var(--white-color);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 601px) {
  .modal {
    padding: 2rem 1rem;
  }
}

/* Overlay content styling */
.overlay .content {
  color: var(--white-color);
  line-height: 1.7;
  font-size: 1rem;
  max-height: 90vh;
  overflow-y: auto;
}

/* Style common HTML elements from Medium content */
.overlay .content h1,
.overlay .content h2,
.overlay .content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.overlay .content p {
  margin-bottom: 1rem;
}

/* Handle image overflow */
.modal .content figure {
  width: 100%;
  max-width: 100%;
  margin: 1rem 0;
  display: block;
  overflow: hidden;
}

.modal .content figure img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
}

.modal .content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
.modal .content {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.overlay .content a {
  color: var(--blue-color);
  text-decoration: underline;
}

.overlay .content figcaption {
  display: none;
}

.close-btn {
  position: absolute;
  margin-top: 0;
  right: 1rem;
  background: transparent;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  color: var(--white-color);
}
</style>
