import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PostMeta from './PostMeta.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-before': () => h(PostMeta) }),
}
