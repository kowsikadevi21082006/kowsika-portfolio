document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const body = document.body

  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode")
      body.classList.add("light-mode")
      localStorage.setItem("theme", "light")
    } else {
      body.classList.remove("light-mode")
      body.classList.add("dark-mode")
      localStorage.setItem("theme", "dark")
    }

    // Update skill rings when theme changes
    updateSkillRings()
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
  }

  // Navigation
  const navLinks = document.querySelectorAll(".nav-links li")
  const sections = document.querySelectorAll(".section")
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")

  // Mobile Navigation Toggle
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active")

    // Burger Animation
    burger.classList.toggle("toggle")

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })
  })

  // Navigation Click Handler
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const sectionId = this.getAttribute("data-section")

      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("active")
      })

      // Show selected section
      document.getElementById(sectionId).classList.add("active")

      // Update active nav link
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active")
      })
      this.classList.add("active")

      // Close mobile menu if open
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active")
        burger.classList.remove("toggle")

        navLinks.forEach((link) => {
          link.style.animation = ""
        })
      }

      // Trigger animations for the active section
      if (sectionId === "about") {
        setTimeout(() => {
          document.querySelector(".about-container").classList.add("animate")
        }, 300)
      }

      if (sectionId === "skills") {
        setTimeout(() => {
          updateSkillRings()
        }, 300)
      }

      if (sectionId === "projects") {
        animateProjects()
      }
    })
  })

  // Initialize Particles.js
  let particlesJS // Declare particlesJS variable
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: body.classList.contains("dark-mode") ? "#64ffda" : "#0070f3",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: body.classList.contains("dark-mode") ? "#64ffda" : "#0070f3",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Update Skill Rings
  function updateSkillRings() {
    const skillRings = document.querySelectorAll(".skill-ring")

    skillRings.forEach((ring, index) => {
      setTimeout(() => {
        const percent = ring.getAttribute("data-percent")
        const progressCircle = ring.querySelector(".skill-ring-progress")
        const circumference = 2 * Math.PI * 40 // 40 is the radius of the circle

        // Calculate stroke-dashoffset based on percentage
        const offset = circumference - (percent / 100) * circumference

        // Apply the offset with a delay for animation
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`
        progressCircle.style.strokeDashoffset = circumference // Start from full offset

        setTimeout(() => {
          progressCircle.style.strokeDashoffset = offset // Animate to the percentage
        }, 100)
      }, index * 200) // Stagger the animations
    })
  }

  // Animate Projects
  function animateProjects() {
    const projects = document.querySelectorAll(".project-box")

    projects.forEach((project, index) => {
      project.style.animationDelay = `${index * 0.2}s`
    })
  }

  // Contact Form
  const contactForm = document.getElementById("contact-form")
  const successMessage = document.getElementById("success-message")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    contactForm.style.display = "none"
    successMessage.style.display = "block"

    // Reset form
    contactForm.reset()

    // Hide success message after 5 seconds and show form again
    setTimeout(() => {
      successMessage.style.display = "none"
      contactForm.style.display = "block"
    }, 5000)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Parallax effect for floating elements
  document.addEventListener("mousemove", (e) => {
    const floatingElements = document.querySelectorAll(".floating-element")

    floatingElements.forEach((element) => {
      const speed = 0.05
      const x = (window.innerWidth - e.pageX * speed) / 100
      const y = (window.innerHeight - e.pageY * speed) / 100

      element.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
  })

  // Initialize animations for the active section on load
  const activeSection = document.querySelector(".section.active")
  if (activeSection) {
    const sectionId = activeSection.id

    if (sectionId === "about") {
      setTimeout(() => {
        document.querySelector(".about-container").classList.add("animate")
      }, 300)
    }

    if (sectionId === "skills") {
      setTimeout(() => {
        updateSkillRings()
      }, 300)
    }

    if (sectionId === "projects") {
      animateProjects()
    }
  }

  // Run animations on scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    // Check if about section is in view
    const aboutSection = document.getElementById("about")
    if (aboutSection.classList.contains("active")) {
      const aboutContainer = aboutSection.querySelector(".about-container")
      if (isInViewport(aboutContainer) && !aboutContainer.classList.contains("animate")) {
        aboutContainer.classList.add("animate")
      }
    }

    // Check if skills section is in view
    const skillsSection = document.getElementById("skills")
    if (skillsSection.classList.contains("active") && isInViewport(skillsSection)) {
      updateSkillRings()
    }

    // Check if projects section is in view
    const projectsSection = document.getElementById("projects")
    if (projectsSection.classList.contains("active") && isInViewport(projectsSection)) {
      animateProjects()
    }
  })

  // Helper function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Initialize animations on page load
  setTimeout(() => {
    // Trigger typing effect for name
    const typingEffect = document.querySelector(".typing-effect")
    if (typingEffect) {
      typingEffect.classList.add("start")
    }

    // Initialize skill rings if skills section is active
    if (document.getElementById("skills").classList.contains("active")) {
      updateSkillRings()
    }

    // Initialize project animations if projects section is active
    if (document.getElementById("projects").classList.contains("active")) {
      animateProjects()
    }

    // Initialize about section animations if about section is active
    if (document.getElementById("about").classList.contains("active")) {
      document.querySelector(".about-container").classList.add("animate")
    }
  }, 500)
})
