<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Mail,
  Menu,
  Palette,
  PenTool,
  Send,
  Sparkles,
  X,
} from '@lucide/vue'
import ProjectCard from './components/ProjectCard.vue'
import DesignCard from './components/DesignCard.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import { designs, projects, skills } from './data/portfolio'
import profileImage from './assets/pic.png'

const menuOpen = ref(false)
const activeFilter = ref('All')
const selectedProject = ref(null)
const selectedDesign = ref(null)
const sent = ref(false)
const isScrolled = ref(false)
const isSubmitting = ref(false)
const formError = ref('')
const contactForm = ref(null)
const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})
const filters = ['All', 'Graphic design', 'Email design', 'UI / web design']
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const filteredDesigns = computed(() =>
  activeFilter.value === 'All'
    ? designs
    : designs.filter(
        (item) =>
          item.category.toLowerCase() === activeFilter.value.toLowerCase(),
      ),
)

const setDesignFilter = (filter) => {
  activeFilter.value = filter

  const designSection = document.getElementById('design')
  designSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const closeMenu = () => {
  menuOpen.value = false
}

const submitForm = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  formError.value = ''

  try {
    if (!serviceId || !templateId || !publicKey) {
      throw new Error(
        'Email service is not configured yet. Add your EmailJS keys in the environment file.',
      )
    }

    if (!contactForm.value) {
      throw new Error('Contact form could not be found.')
    }

    await emailjs.sendForm(serviceId, templateId, contactForm.value, {
      publicKey,
    })

    sent.value = true
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
  } catch (error) {
    console.error('EmailJS send failed:', error)
    sent.value = false
    formError.value =
      error?.text || error?.message || 'Something went wrong while sending your message.'
  } finally {
    isSubmitting.value = false
  }
}

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 18
}

onMounted(() =>
  window.addEventListener('scroll', updateScrollState, { passive: true }),
)

onBeforeUnmount(() =>
  window.removeEventListener('scroll', updateScrollState),
)
</script>

<template>
  <div class="site-shell">
    <AnimatedBackground />

    <header
      class="navbar"
      :class="{ 'navbar-scrolled': isScrolled }"
    >
      <a
        href="#home"
        class="brand"
        @click="closeMenu"
      >
        <span class="brand-mark">A</span>
        <span>
          Arielle Castillo<span class="brand-dot">.</span>
        </span>
      </a>

      <nav
        class="desktop-nav"
        aria-label="Main navigation"
      >
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#design">Design</a>
        <a href="#skills">Skills</a>
      </nav>

      <a
        class="nav-cta"
        href="#contact"
      >
        Let's talk
        <ArrowUpRight :size="16" />
      </a>

      <button
        class="menu-toggle"
        type="button"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" />
        <Menu v-else />
      </button>

      <nav
        v-if="menuOpen"
        class="mobile-nav"
      >
        <a
          href="#about"
          @click="closeMenu"
        >
          About
        </a>
        <a
          href="#services"
          @click="closeMenu"
        >
          Services
        </a>
        <a
          href="#projects"
          @click="closeMenu"
        >
          Projects
        </a>
        <a
          href="#design"
          @click="closeMenu"
        >
          Design
        </a>
        <a
          href="#skills"
          @click="closeMenu"
        >
          Skills
        </a>
        <a
          href="#contact"
          @click="closeMenu"
        >
          Let's talk ↗
        </a>
      </nav>
    </header>

    <main>
      <section
        id="home"
        class="hero section-shell"
      >
        <div class="hero-copy reveal">
          <p class="kicker">
            <span class="status-dot"></span>
            Available for select projects · 2026
          </p>

          <h1>
            I design &amp; build
            <em>modern</em>
            web experiences.
          </h1>

          <p class="hero-intro">
            I'm a Front-End Developer &amp; Designer creating fast, responsive websites and digital products that look great, work beautifully, support functionality, &amp; boost user engagement.
          </p>

          <div class="hero-actions">
            <a
              class="button button-primary"
              href="#projects"
            >
              View my work
              <ArrowDownRight :size="17" />
            </a>
            <a
              class="button button-ghost"
              href="https://docs.google.com/document/d/1rPLNMvm3W2Ze-q-e0wR3yLfhmT7NVTHKNqg21uMtVoo/edit?tab=t.0" target="_blank" rel="noopener noreferrer"
            >
              Download resume
              <ArrowUpRight :size="17" />
            </a>
          </div>

          <div class="stack-line">
            <span>Figma</span>
            <b>Vue.js</b>
            <b>Node.js</b>
            <b>JavaScript</b>
            <b>HTML</b>
            <b>CSS</b>
          </div>
        </div>

        <div class="hero-visual reveal reveal-delay">
          <div class="visual-glow"></div>

          <div class="window-card">
            <div class="window-top">
              <span class="window-dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span>studio.castillo.dev</span>
              <span>•••</span>
            </div>

            <div class="window-content">
              <div class="mini-nav">
                <b>AC.</b>
                <span>Work</span>
                <span>About</span>
                <span>Contact</span>
                <i>↗</i>
              </div>

              <div class="mini-heading">
                <span>Selected work</span>
                <strong>
                  Ideas<br />
                  <em>in motion.</em>
                </strong>
              </div>

              <div class="mini-art">
                <div class="art-orbit"></div>
                <span>01 / 04</span>
              </div>

              <div class="mini-footer">
                <span>Digital design &amp; development</span>
                <span>Scroll to explore ↓</span>
              </div>
            </div>
          </div>

          <div class="floating-note note-one">
            <Sparkles :size="15" />
            Thoughtful by default
          </div>
          <div class="floating-note note-two">
            Code <span>+</span> craft
          </div>
        </div>
      </section>

      <section
        id="about"
        class="section-shell about-section"
      >
        <div class="section-label">
          <span>01</span>
          <span>About me</span>
        </div>

        <div class="about-grid">
          <div class="portrait-wrap">
            <div class="portrait-placeholder">
              <img
                :src="profileImage"
                alt="Profile photo"
              />
            </div>
            <div class="portrait-caption">
              <span>Based in</span>
              <strong>Laguna,Philippines / Remote</strong>
            </div>
          </div>

          <div class="about-copy">
            <p class="eyebrow">A developer with a designer's eye.</p>
            <h2>
              I care about the details that make a digital experience feel
              <em>effortless.</em>
            </h2>
            <p>
              I combine front-end development with visual design to turn complex ideas into clear, intuitive experiences. From the first sketch to the final line of code, I enjoy finding the balance between how something works and how it makes someone feel.
            </p>
            <p>
              Currently open to thoughtful collaborations, product teams, and ambitious ideas that need a sharp digital home.
            </p>
            <a
              href="#contact"
              class="text-link"
            >
              More about me
              <ArrowUpRight :size="17" />
            </a>
          </div>
        </div>

        <div class="stats-grid">
          <div>
            <strong>5<span>+</span></strong>
            <span>Projects completed</span>
          </div>
          <div>
            <strong>5<span>+</span></strong>
            <span>Technologies used</span>
          </div>
          <div>
            <strong>1<span>+</span></strong>
            <span>Years of experience</span>
          </div>
          <div>
            <strong>5<span>x</span></strong>
            <span>Design + development</span>
          </div>
        </div>
      </section>

      <section
        id="services"
        class="section-shell services-section"
      >
        <div class="section-label">
          <span>02</span>
          <span>What I do</span>
        </div>

        <div class="section-heading">
          <h2>
            Built for clarity.<br />
            <em>Designed to connect.</em>
          </h2>
          <p>
            Every project is a chance to make something useful, memorable, and a little more human.
          </p>
        </div>

        <div class="services-grid">
          <article>
            <Code2 :size="25" />
            <span>01</span>
            <h3>
              Front-end<br />
              development
            </h3>
            <p>
              Responsive, accessible and performant websites and web apps built with modern technologies.
            </p>

            <ul class="skills-list">
              <li>HTML, CSS, JavaScript</li>
              <li>Responsive Design</li>
              <li>Performance Optimization</li>
              <li>Cross-Browser Compatibility</li>
            </ul>

            <a href="#projects">
              Explore development
              <ArrowUpRight :size="16" />
            </a>
          </article>

          <article>
            <PenTool :size="25" />
            <span>02</span>
            <h3>
              Web &amp; UI<br />
              design
            </h3>
            <p>
              Modern, clean, user-focused interfaces designed around strong hierarchy and usability.
            </p>

            <ul class="skills-list">
              <li>User Research</li>
              <li>Wireframing & Prototyping</li>
              <li>Usability Testing</li>
            </ul>

            <a
              href="#design"
              @click.prevent="setDesignFilter('UI / web design')"
            >
              Explore design
              <ArrowUpRight :size="16" />
            </a>
          </article>

          <article>
            <Palette :size="25" />
            <span>03</span>
            <h3>
              Graphic<br />
              design
            </h3>
            <p>
              Digital graphics, marketing visuals, and brand-focused visuals with a clear point of view.
            </p>

            <ul class="skills-list">
              <li>Brand Identity</li>
              <li>Marketing Materials</li>
              <li>Social Media Graphics</li>
              <li>Print and Digital Design</li>
            </ul>

            <a
              href="#design"
              @click.prevent="setDesignFilter('Graphic design')"
            >
              Explore graphics
              <ArrowUpRight :size="16" />
            </a>
          </article>

          <article>
            <Mail :size="25" />
            <span>04</span>
            <h3>
              Email<br />
              design
            </h3>
            <p>
              Responsive email templates designed for campaigns and consistent brand communication.
            </p>

             <ul class="skills-list">
              <li>Responsive Email Templates</li>
              <li>Newsletter Design</li>
              <li>Campaign Design</li>
              <li>Email Marketing Support</li>
            </ul>
&nbsp;
            <a
              href="#design" 
              @click.prevent="setDesignFilter('Email design')"
            >
              Explore email
              <ArrowUpRight :size="16" />
            </a>
          </article>
        </div>
      </section>

      <section
        id="projects"
        class="section-shell projects-section"
      >
        <div class="section-label">
          <span>03</span>
          <span>Selected work</span>
        </div>

        <div class="section-heading projects-heading">
          <h2>
            A few things<br />
            <em>I've made.</em>
          </h2>
          <a href="#contact" class="text-link">
            Start a project
            <ArrowUpRight :size="17" />
          </a>
        </div>

        <div class="projects-grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.title"
            :project="project"
            @select="selectedProject = $event"
          />
        </div>
      </section>

      <section
        id="design"
        class="section-shell design-section"
      >
        <div class="section-label">
          <span>04</span>
          <span>Design archive</span>
        </div>

        <div class="design-intro">
          <div>
            <h2>
              Where ideas<br />
              <em>take shape.</em>
            </h2>
          </div>
          <p>
            A collection of graphic, web, and email design explorations. Click into a piece to take a closer look.
          </p>
        </div>

        <div class="filter-row">
          <button
            v-for="filter in filters"
            :key="filter"
            :class="{ active: activeFilter === filter }"
            type="button"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>

        <div class="design-grid">
          <DesignCard
            v-for="design in filteredDesigns"
            :key="design.title"
            :design="design"
            @select="selectedDesign = $event"
          />
        </div>
      </section>

      <section
        id="skills"
        class="section-shell skills-section"
      >
        <div class="section-label">
          <span>05</span>
          <span>Tools of the trade</span>
        </div>

        <div class="skills-layout">
          <div>
            <h2>
              The right tools<br />
              <em>for the job.</em>
            </h2>
            <p>
              Always learning, always refining. These are the tools I reach for to turn a blank canvas into something useful.
            </p>
          </div>

          <div class="skills-list">
            <div
              v-for="(toolset, group) in skills"
              :key="group"
              class="skill-group"
            >
              <div class="eyebrow">{{ group }}</div>
              <div class="skill-tags">
                <span
                  v-for="skill in toolset"
                  :key="skill"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        class="contact-section"
      >
        <div class="section-shell contact-grid">
          <div>
            <p class="kicker">
              <span class="status-dot"></span>
              Have a project in mind?
            </p>
            <h2>
              Let's build<br />
              <em>something great</em><br />
              together.
            </h2>

            <div class="contact-links">
              <a href="mailto:ariellecharlize26@gmail.com" target="_blank" rel="noopener norefferer">
                <Mail :size="17" />
                ariellecharlize26@gmail.com
              </a>
              <span>⌖ Laguna,Philippines· Remote</span>
              <a href="https://www.linkedin.com/in/arielle-charlize-castillo-0838aa259/" target="_blank" rel="noopener noreferrer">↗ LinkedIn </a>
              <a href="https://github.com/ArielleCastle" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
            </div>
          </div>

          <form
            ref="contactForm"
            class="contact-form"
            @submit.prevent="submitForm"
          >
            <p class="eyebrow">Start a conversation</p>

            <div class="field-row">
              <label>
                Name
                <input
                  v-model="formData.name"
                  name="name"
                  required
                  type="text"
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  v-model="formData.email"
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label>
              Subject
              <input
                v-model="formData.subject"
                name="subject"
                required
                type="text"
                placeholder="What can I help with?"
              />
            </label>

            <label>
              Message
              <textarea
                v-model="formData.message"
                name="message"
                required
                rows="4"
                placeholder="Tell me a little about your project..."
              ></textarea>
            </label>

            <button
              class="button button-primary"
              type="submit"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Sending...' : sent ? 'Message sent' : 'Send message' }}
              <Check
                v-if="sent && !isSubmitting"
                :size="17"
              />
              <Send
                v-else
                :size="17"
              />
            </button>

            <p
              v-if="formError"
              class="form-error"
            >
              {{ formError }}
            </p>

            <p
              v-else-if="sent"
              class="form-success"
            >
              Thanks — your message has been sent successfully. I’ll be in touch soon.
            </p>
          </form>
        </div>
      </section>
    </main>

    <footer class="footer section-shell">
      <div class="footer-top">
        <a
          href="#home"
          class="brand"
        >
          <span class="brand-mark">A</span>
          <span>
            Arielle Castillo<span class="brand-dot">.</span>
          </span>
        </a>
        <p>
          Front-end developer &amp; designer<br />
          making the web a little more thoughtful.
        </p>
        <div class="socials">
          <a
            href="https://www.linkedin.com/in/arielle-charlize-castillo-0838aa259"
            aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
          >
            in
          </a>
          <a
            href="https://github.com/ArielleCastle"
            aria-label="GitHub" target="_blank" rel="noopener noreferrer"
          >
            gh
          </a>
          <a
            href="https://www.instagram.com/acpaintsph/"
            aria-label="Instagram" target="_blank" rel="noopener noreferrer"
          >
            ig
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 Arielle Castillo. </span>
        <span>
          Designed &amp; built with
          <span class="heart">♥</span>
        </span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>

    <Transition name="modal">
      <div
        v-if="selectedProject"
        class="modal-backdrop"
        @click.self="selectedProject = null"
      >
        <div class="detail-modal">
          <button
            class="modal-close"
            type="button"
            aria-label="Close project details"
            @click="selectedProject = null"
          >
            <X />
          </button>
          <img
            :src="selectedProject.image"
            :alt="selectedProject.title"
          />

          <div class="detail-content">
            <p class="eyebrow">{{ selectedProject.category }}</p>
            <h2>{{ selectedProject.title }}</h2>
            <p>{{ selectedProject.overview }}</p>

            <div class="detail-columns">
              <div>
                <span class="eyebrow">The challenge</span>
                <p>{{ selectedProject.problem }}</p>
              </div>
              <div>
                <span class="eyebrow">The approach</span>
                <p>{{ selectedProject.solution }}</p>
              </div>
            </div>

            <div class="detail-bottom">
              <div>
                <span class="eyebrow">My role</span>
                <p>{{ selectedProject.role }}</p>
              </div>
              <div>
                <span class="eyebrow">Key features</span>
                <ul>
                  <li
                    v-for="feature in selectedProject.features"
                    :key="feature"
                  >
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="modal">
      <div
        v-if="selectedDesign"
        class="modal-backdrop design-modal-backdrop"
        @click.self="selectedDesign = null"
      >
        <div class="design-modal">
          <button
            class="modal-close"
            type="button"
            aria-label="Close design preview"
            @click="selectedDesign = null"
          >
            <X />
          </button>
          <img
            :src="selectedDesign.image"
            :alt="selectedDesign.title"
          />
          <div>
            <p class="eyebrow">{{ selectedDesign.category }}</p>
            <h2>{{ selectedDesign.title }}</h2>
            <p>{{ selectedDesign.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
