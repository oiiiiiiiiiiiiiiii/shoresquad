// ShoreSquad App JS - Enhanced with performance and accessibility features

class ShoreSquadApp {
  constructor() {
    this.eventData = JSON.parse(localStorage.getItem('shoreSquadEvents')) || [];
    this.userLocation = null;
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupEventHandlers();
    this.loadUserLocation();
    this.displayEvents();
    this.setupLazyLoading();
  }
  setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Enhanced mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking nav links (mobile)
      navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link') && window.innerWidth <= 768) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Update active nav link
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
  setupEventHandlers() {
    // Join button interaction
    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
      joinBtn.addEventListener('click', () => {
        this.showJoinModal();
      });
    }

    // Create button interaction
    const createBtn = document.getElementById('create-btn');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        this.showCreateModal();
      });
    }

    // Header action buttons
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        this.showLoginModal();
      });
    }
    
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        this.showSignupModal();
      });
    }
  }

  loadUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.loadWeatherData();
          this.loadMapData();
        },
        (error) => {
          console.log('Location access denied or unavailable');
          this.loadDefaultContent();
        }
      );
    } else {
      this.loadDefaultContent();
    }
  }

  loadWeatherData() {
    const weatherInfo = document.getElementById('weather-info');
    
    // Simulate weather data (replace with real API call)
    setTimeout(() => {
      const mockWeather = {
        temp: 24,
        condition: 'Sunny',
        windSpeed: 12,
        humidity: 65
      };

      weatherInfo.innerHTML = `
        <div class="weather-card">
          <h4>Current Conditions</h4>
          <p><strong>${mockWeather.temp}°C</strong> - ${mockWeather.condition}</p>
          <p>Wind: ${mockWeather.windSpeed} km/h | Humidity: ${mockWeather.humidity}%</p>
          <p class="weather-status">Perfect conditions for a beach cleanup! 🌊</p>
        </div>
      `;
    }, 1000);
  }

  loadMapData() {
    const mapContainer = document.getElementById('map-container');
    
    // Simulate map loading (replace with actual map integration)
    setTimeout(() => {
      mapContainer.innerHTML = `
        <div class="map-placeholder">
          <h4>Interactive Map</h4>
          <p>📍 3 beach cleanups near you</p>
          <ul class="cleanup-locations">
            <li>🏖️ Sentosa Beach - Tomorrow 9AM</li>
            <li>🏖️ East Coast Park - Saturday 2PM</li>
            <li>🏖️ Changi Beach - Sunday 10AM</li>
          </ul>
          <p><em>Click locations to join or get directions</em></p>
        </div>
      `;
    }, 800);
  }

  loadDefaultContent() {
    document.getElementById('weather-info').innerHTML = 
      '<p>Enable location access for personalized weather updates!</p>';
    
    document.getElementById('map-container').innerHTML = 
      '<p>Enable location access to find cleanups near you!</p>';
  }

  displayEvents() {
    const eventList = document.getElementById('event-list');
    
    if (this.eventData.length === 0) {
      return; // Keep default message
    }

    eventList.innerHTML = this.eventData.map(event => `
      <li class="event-item">
        <strong>${event.name}</strong>
        <p>${event.location} - ${event.date}</p>
        <span class="crew-count">${event.crewSize} crew members</span>
      </li>
    `).join('');
  }

  showJoinModal() {
    // Enhanced modal with better UX
    const modal = this.createModal('Join a Beach Cleanup', `
      <div class="modal-content">
        <h3>🌊 Find Your Perfect Cleanup</h3>
        <p>Discover beach cleanup events near you and make a difference!</p>
        <div class="location-input">
          <label for="location">Your Location:</label>
          <input type="text" id="location" placeholder="Enter city or zip code" />
          <button class="btn-primary" onclick="this.searchNearbyEvents()">Find Events</button>
        </div>
        <div class="quick-actions">
          <h4>Quick Options:</h4>
          <button class="btn-secondary" onclick="this.useCurrentLocation()">📍 Use Current Location</button>
          <button class="btn-secondary" onclick="this.viewAllEvents()">👀 View All Events</button>
        </div>
      </div>
    `);
    
    this.showNotification('Welcome! Let\'s find you a cleanup event. 🏖️', 'success');
  }

  showCreateModal() {
    const modal = this.createModal('Create New Event', `
      <div class="modal-content">
        <h3>🚀 Start Your Own Cleanup</h3>
        <p>Rally your crew and organize a beach cleanup event!</p>
        <form class="create-event-form">
          <div class="form-group">
            <label for="event-name">Event Name:</label>
            <input type="text" id="event-name" placeholder="e.g., Santa Monica Beach Cleanup" required />
          </div>
          <div class="form-group">
            <label for="event-date">Date & Time:</label>
            <input type="datetime-local" id="event-date" required />
          </div>
          <div class="form-group">
            <label for="event-location">Location:</label>
            <input type="text" id="event-location" placeholder="Beach address or coordinates" required />
          </div>
          <div class="form-group">
            <label for="event-description">Description:</label>
            <textarea id="event-description" rows="3" placeholder="Tell people what to expect..."></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Create Event</button>
            <button type="button" class="btn-secondary" onclick="this.closeModal()">Cancel</button>
          </div>
        </form>
      </div>
    `);
  }

  showLoginModal() {
    const modal = this.createModal('Welcome Back!', `
      <div class="modal-content">
        <h3>🌊 Login to ShoreSquad</h3>
        <form class="login-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Login</button>
            <button type="button" class="btn-secondary" onclick="this.closeModal()">Cancel</button>
          </div>
          <p class="auth-link">Don't have an account? <a href="#" onclick="this.showSignupModal()">Sign up here</a></p>
        </form>
      </div>
    `);
  }

  showSignupModal() {
    const modal = this.createModal('Join ShoreSquad!', `
      <div class="modal-content">
        <h3>🚀 Create Your Account</h3>
        <p>Join thousands of eco-warriors making a difference!</p>
        <form class="signup-form">
          <div class="form-group">
            <label for="name">Full Name:</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div class="form-group">
            <label for="signup-email">Email:</label>
            <input type="email" id="signup-email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label for="signup-password">Password:</label>
            <input type="password" id="signup-password" placeholder="••••••••" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Create Account</button>
            <button type="button" class="btn-secondary" onclick="this.closeModal()">Cancel</button>
          </div>
          <p class="auth-link">Already have an account? <a href="#" onclick="this.showLoginModal()">Login here</a></p>
        </form>
      </div>
    `);
  }

  createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal HTML
    const modalHTML = `
      <div class="modal-overlay" onclick="this.closeModal(event)">
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2>${title}</h2>
            <button class="modal-close" onclick="this.closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
        </div>
      </div>
    `;

    // Add to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
      const modalStyles = `
        <style id="modal-styles">
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
          }
          
          .modal {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
          }
          
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
          }
          
          .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          
          .modal-close:hover {
            background: #f0f0f0;
            color: #333;
          }
          
          .modal-body {
            padding: 1.5rem;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--charcoal);
          }
          
          .form-group input, .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
          }
          
          .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: var(--ocean-blue);
          }
          
          .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
          }
          
          .auth-link {
            text-align: center;
            margin-top: 1rem;
            font-size: 0.9rem;
          }
          
          .auth-link a {
            color: var(--ocean-blue);
            text-decoration: none;
            font-weight: 600;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        </style>
      `;
      document.head.insertAdjacentHTML('beforeend', modalStyles);
    }

    return document.querySelector('.modal-overlay');
  }

  closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    }
  }

  joinEvent(event) {
    this.eventData.push(event);
    this.saveEvents();
    this.displayEvents();
    
    // Show success feedback
    this.showNotification('Successfully joined the cleanup! 🌊');
  }

  createEvent(event) {
    this.eventData.push(event);
    this.saveEvents();
    this.displayEvents();
    
    this.showNotification('Event created! Start rallying your crew! 🚀');
  }

  saveEvents() {
    localStorage.setItem('shoreSquadEvents', JSON.stringify(this.eventData));
  }

  showNotification(message, type = 'info') {
    // Simple notification (enhance with proper toast notifications later)
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--seafoam-green);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  setupLazyLoading() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ShoreSquadApp();
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Force page refresh script - remove cache issues
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}

// Clear any stored data
if (typeof(Storage) !== "undefined") {
  // Clear cache timestamp
  localStorage.setItem('lastCacheBreak', Date.now());
}
