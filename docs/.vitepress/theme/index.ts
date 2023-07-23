import Theme from 'vitepress/theme'
import './style/var.css'
import { h } from 'vue'
import AnimateTitle from '../components/AnimationTitle.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-hero-info': () => h(AnimateTitle),
    })
  },
  enhanceApp({ app }) {},
}
